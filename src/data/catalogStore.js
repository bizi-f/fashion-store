import { categories as fallbackCategories, products as fallbackProducts } from '@/data/catalog'

const DEFAULT_TONE = 'slate'
const DEFAULT_BADGE = 'new'
const DEFAULT_SIZES = ['S', 'M', 'L']
const DEFAULT_CATEGORY_LABEL = 'Категория'

const clone = (value) => JSON.parse(JSON.stringify(value))

const formatPrice = (value) =>
  `${new Intl.NumberFormat('ru-RU').format(value || 0)} ₽`

const normalizePriceValue = (value, fallbackValue = '') => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  const digits = String(value || fallbackValue).replace(/[^\d]/g, '')
  return Number(digits || 0)
}

const normalizeCategory = (category, index = 0) => {
  const key = String(category?.key || `category-${index + 1}`)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')

  const label = String(category?.label || key).trim()
  const href = String(category?.href || `/catalog.html?category=${key}`).trim()

  return { key, label, href }
}

const normalizeProduct = (product, index = 0, categoriesMap = new Map()) => {
  const id = String(product?.id || `product-${Date.now()}-${index}`).trim()
  const categoryKey = String(product?.categoryKey || '').trim()
  const category =
    categoriesMap.get(categoryKey)?.label ||
    String(product?.category || DEFAULT_CATEGORY_LABEL).trim()
  const priceValue = normalizePriceValue(product?.priceValue, product?.price)
  const oldPriceValue = normalizePriceValue(
    product?.oldPriceValue,
    product?.oldPrice
  )
  const image = String(product?.image || 'product-01.svg').trim()
  const gallery =
    Array.isArray(product?.gallery) && product.gallery.length
      ? product.gallery
      : [image, image.replace('.svg', '-alt-01.svg'), image.replace('.svg', '-alt-02.svg')]
  const sizes =
    Array.isArray(product?.sizes) && product.sizes.length
      ? product.sizes.map((size) => String(size))
      : DEFAULT_SIZES

  return {
    id,
    title: String(product?.title || 'Новый товар').trim(),
    category,
    categoryKey,
    badge: String(product?.badge || DEFAULT_BADGE).trim(),
    priceValue,
    oldPriceValue,
    price: String(product?.price || formatPrice(priceValue)).trim(),
    oldPrice: String(
      product?.oldPrice || formatPrice(oldPriceValue || priceValue)
    ).trim(),
    image,
    tone: String(product?.tone || DEFAULT_TONE).trim(),
    sizes,
    description: String(product?.description || '').trim(),
    material: String(product?.material || '').trim(),
    reviews: Array.isArray(product?.reviews) ? product.reviews : [],
    gallery,
  }
}

const getFallbackState = () => {
  const categories = clone(fallbackCategories).map((item, index) =>
    normalizeCategory(item, index)
  )
  const categoriesMap = new Map(categories.map((item) => [item.key, item]))
  const products = clone(fallbackProducts).map((item, index) =>
    normalizeProduct(item, index, categoriesMap)
  )

  return { categories, products }
}

const getApiBase = () => {
  const envBase = String(import.meta.env.VITE_API_BASE_URL || '').trim()
  if (envBase) {
    return envBase.endsWith('/') ? envBase.slice(0, -1) : envBase
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:4000'
  }

  const { hostname, port, origin } = window.location
  const isLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1'

  if (isLocal && port !== '4000') {
    return 'http://localhost:4000'
  }

  return origin
}

const fetchJson = async (path) => {
  const response = await fetch(`${getApiBase()}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${path}`)
  }

  return response.json()
}

let catalogState = getFallbackState()
let isInitialized = false

export const initCatalogState = async () => {
  if (isInitialized) {
    return catalogState
  }

  try {
    const [categoriesRaw, productsRaw] = await Promise.all([
      fetchJson('/api/categories'),
      fetchJson('/api/products'),
    ])

    const categories = Array.isArray(categoriesRaw)
      ? categoriesRaw.map(normalizeCategory)
      : []
    const categoriesMap = new Map(categories.map((item) => [item.key, item]))
    const products = Array.isArray(productsRaw)
      ? productsRaw.map((item, index) =>
          normalizeProduct(item, index, categoriesMap)
        )
      : []

    if (categories.length && products.length) {
      catalogState = { categories, products }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Catalog API is unavailable, fallback data is used.', error)
  } finally {
    isInitialized = true
  }

  return catalogState
}

export const getCatalogState = () => catalogState

export const getCategories = () => catalogState.categories

export const getProducts = () => catalogState.products

export const getProductById = (id) =>
  catalogState.products.find((product) => product.id === id) || null

export const getProductsByCategory = (categoryKey) =>
  catalogState.products.filter((product) => product.categoryKey === categoryKey)
