import Badge from '@/components/Badge/Badge'
import { withBase } from '@/lib/sitePath'

const ProductTile = ({
  id = 'placeholder-item',
  title,
  category,
  categoryKey = 'all',
  price,
  oldPrice,
  priceValue,
  badge,
  image = 'product-01.svg',
  tone = 'slate',
  sizes = ['One Size'],
}) => `<article class="product-tile product-tile--${tone}" data-js-product-tile data-product-id="${id}" data-category-key="${categoryKey}" data-price="${priceValue}">
  <a class="product-tile__media" href="${withBase(`/product.html?id=${id}`)}" aria-label="Открыть ${title}">
    <img class="product-tile__image" src="${withBase(`/images/placeholders/${image}`)}" alt="${title}" loading="lazy" />
    <span class="product-tile__glow"></span>
  </a>
  <div class="product-tile__body">
    <div class="product-tile__row">
      ${Badge({ label: badge, mode: 'neutral' })}
      <p class="product-tile__category">${category}</p>
    </div>
    <h3 class="product-tile__title"><a class="product-tile__title-link" href="${withBase(`/product.html?id=${id}`)}">${title}</a></h3>
    <div class="product-tile__footer">
      <p class="product-tile__price">
        <span class="product-tile__price-current">${price}</span>
        <span class="product-tile__price-old">${oldPrice}</span>
      </p>
      <button
        class="button button--ghost product-tile__action"
        type="button"
        data-js-cart-add
        data-product-id="${id}"
        data-product-title="${title}"
        data-product-price="${priceValue}"
        data-product-size="${sizes[0] || 'One Size'}"
        data-product-image="${withBase(`/images/placeholders/${image}`)}"
      >
        <span class="button__label">В корзину</span>
      </button>
    </div>
  </div>
</article>`

export default ProductTile
