import '@/appStyles'
import App from '@/app'
import HomePage from '@/pages/home'
import CatalogPage from '@/pages/catalog'
import WomenPage from '@/pages/women'
import MenPage from '@/pages/men'
import OuterwearPage from '@/pages/outerwear'
import AccessoriesPage from '@/pages/accessories'
import ProductPage from '@/pages/product'
import CheckoutPage from '@/pages/checkout'
import AboutPage from '@/pages/about'
import ContactsPage from '@/pages/contacts'
import NotFoundPage from '@/pages/notFound'
import ThemeSwitcher from '@/modules/ThemeSwitcher'
import MobileMenu from '@/modules/MobileMenu'
import Cart from '@/modules/Cart'
import CatalogFilters from '@/modules/CatalogFilters'
import ProductGallery from '@/modules/ProductGallery'
import CheckoutForm from '@/modules/CheckoutForm'
import ScrollReveal from '@/modules/ScrollReveal'
import { initCatalogState } from '@/data/catalogStore'
import { normalizePathname } from '@/lib/sitePath'

const pagesByPath = {
  '/': { title: 'Flux Atelier Store', render: HomePage },
  '/index.html': { title: 'Flux Atelier Store', render: HomePage },
  '/catalog.html': {
    title: 'Каталог | Flux Atelier Store',
    render: CatalogPage,
  },
  '/women.html': {
    title: 'Женская одежда | Flux Atelier Store',
    render: WomenPage,
  },
  '/men.html': {
    title: 'Мужская одежда | Flux Atelier Store',
    render: MenPage,
  },
  '/outerwear.html': {
    title: 'Верхняя одежда | Flux Atelier Store',
    render: OuterwearPage,
  },
  '/accessories.html': {
    title: 'Аксессуары | Flux Atelier Store',
    render: AccessoriesPage,
  },
  '/product.html': {
    title: 'Карточка товара | Flux Atelier Store',
    render: ProductPage,
  },
  '/checkout.html': {
    title: 'Оформление заказа | Flux Atelier Store',
    render: CheckoutPage,
  },
  '/about.html': {
    title: 'О бренде | Flux Atelier Store',
    render: AboutPage,
  },
  '/contacts.html': {
    title: 'Контакты | Flux Atelier Store',
    render: ContactsPage,
  },
  '/404.html': { title: '404 | Flux Atelier Store', render: NotFoundPage },
}

const mount = async () => {
  const rootElement = document.querySelector('#app')
  if (!rootElement) {
    return
  }

  await initCatalogState()

  const currentPath = normalizePathname(window.location.pathname)
  const currentPage = pagesByPath[currentPath] ?? {
    title: '404 | Flux Atelier Store',
    render: NotFoundPage,
  }

  document.title = currentPage.title
  rootElement.innerHTML = App(currentPage.render(), { currentPath })

  new ThemeSwitcher()
  new MobileMenu()
  new Cart()
  new CatalogFilters()
  new ProductGallery()
  new CheckoutForm()
  new ScrollReveal()
}

mount()
