import Badge from '@/components/Badge/Badge'
import Button from '@/components/Button/Button'
import ProductTile from '@/components/ProductTile/ProductTile'
import { withBase } from '@/lib/sitePath'
import { getProductById, getProducts } from '@/data/catalogStore'

const defaultId = 'product-01'

const ProductPage = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get('id') || defaultId
  const product = getProductById(id) || getProductById(defaultId)

  if (!product) {
    return '<section class="product-page"><div class="container"><p>Товар не найден</p></div></section>'
  }

  const related = getProducts()
    .filter((item) => item.id !== product.id)
    .slice(0, 3)

  return `<section class="product-page">
    <div class="product-page__inner container">
      <div class="product-page__gallery" aria-label="Галерея товара" data-js-product-gallery>
        <div class="product-page__media product-page__media--main">
          <img
            class="product-page__image"
            src="${withBase(`/images/placeholders/${product.gallery[0]}`)}"
            alt="${product.title}"
            data-js-product-gallery-main-image
          />
          <button class="product-page__gallery-button product-page__gallery-button--prev" type="button" aria-label="Предыдущее фото" data-js-product-gallery-prev>‹</button>
          <button class="product-page__gallery-button product-page__gallery-button--next" type="button" aria-label="Следующее фото" data-js-product-gallery-next>›</button>
        </div>
        <div class="product-page__thumbs">
          ${product.gallery
            .map(
              (image, index) => `<button
                class="product-page__thumb ${index === 0 ? 'is-active' : ''}"
                type="button"
                data-js-product-gallery-thumb
                data-image-src="${withBase(`/images/placeholders/${image}`)}"
                data-image-alt="${product.title} вид ${index + 1}"
                aria-label="Фото ${index + 1}"
              >
                <span class="product-page__media product-page__media--thumb">
                  <img class="product-page__image" src="${withBase(`/images/placeholders/${image}`)}" alt="${product.title} миниатюра ${index + 1}" />
                </span>
              </button>`
            )
            .join('')}
        </div>
      </div>

      <div class="product-page__content">
        ${Badge({ label: 'Карточка товара', mode: 'accent' })}
        <h1 class="product-page__title">${product.title}</h1>
        <p class="product-page__text">${product.description}</p>
        <p class="product-page__price"><span class="product-page__price-current">${product.price}</span><span class="product-page__price-old">${product.oldPrice}</span></p>

        <fieldset class="product-page__sizes">
          <legend class="product-page__sizes-title">Размер</legend>
          <div class="product-page__sizes-list">
            ${product.sizes
              .map(
                (size, index) =>
                  `<label class="product-page__size"><input class="product-page__size-input" type="radio" name="product-size" value="${size}" ${index === 0 ? 'checked' : ''}><span class="product-page__size-label">${size}</span></label>`
              )
              .join('')}
          </div>
        </fieldset>

        <div class="product-page__actions">
          <button
            class="button button--primary"
            type="button"
            data-js-cart-add
            data-product-id="${product.id}"
            data-product-title="${product.title}"
            data-product-price="${product.priceValue}"
            data-product-size="${product.sizes[0] || 'One Size'}"
            data-product-image="${withBase(`/images/placeholders/${product.image}`)}"
          ><span class="button__label">Добавить в корзину</span></button>
          ${Button({ label: 'В каталог', href: withBase('/catalog.html'), mode: 'ghost' })}
        </div>

        <ul class="product-page__meta">
          <li class="product-page__meta-item">Материал: ${product.material}</li>
          <li class="product-page__meta-item">Доставка: 1-3 дня</li>
          <li class="product-page__meta-item">Возврат: 14 дней</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="product-page-related">
    <div class="product-page-related__inner container">
      <h2 class="product-page-related__title">С этим товаром покупают</h2>
      <div class="product-page-related__grid">
        ${related.map((item) => ProductTile(item)).join('')}
      </div>
    </div>
  </section>

  <section class="product-page-reviews">
    <div class="product-page-reviews__inner container">
      <h2 class="product-page-reviews__title">Отзывы покупателей</h2>
      <div class="product-page-reviews__list">
        ${product.reviews
          .map(
            (review) =>
              `<article class="product-page-reviews__item"><h3 class="product-page-reviews__author">${review.author}</h3><p class="product-page-reviews__text">${review.text}</p></article>`
          )
          .join('')}
      </div>
    </div>
  </section>`
}

export default ProductPage
