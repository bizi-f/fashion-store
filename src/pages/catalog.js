import ProductTile from '@/components/ProductTile/ProductTile'
import Badge from '@/components/Badge/Badge'
import { getCategories, getProducts } from '@/data/catalogStore'

const CatalogPage = () => {
  const products = getProducts()
  const categories = getCategories()

  return `<section class="catalog-page" data-js-catalog>
  <div class="catalog-page__inner container">
    <div class="catalog-page__head">
      <div class="catalog-page__title-wrap">
        ${Badge({ label: 'Каталог', mode: 'accent' })}
        <h1 class="catalog-page__title">Популярные модели на каждый день</h1>
      </div>
      <p class="catalog-page__text">Выбирайте удобные вещи на работу, учебу и выходные. Размеры в наличии, быстрая доставка и регулярные скидки.</p>
    </div>

    <div class="catalog-page__toolbar">
      <button class="catalog-page__chip is-active" type="button" data-js-catalog-filter="all">Все</button>
      ${categories
        .map(
          (category) =>
            `<button class="catalog-page__chip" type="button" data-js-catalog-filter="${category.key}">${category.label}</button>`
        )
        .join('')}
      <label class="catalog-page__sort">
        <span class="catalog-page__sort-label">Сортировка</span>
        <select class="catalog-page__sort-select" aria-label="Сортировка каталога" data-js-catalog-sort>
          <option value="popular">По популярности</option>
          <option value="cheap">Сначала дешевле</option>
          <option value="expensive">Сначала дороже</option>
          <option value="new">По новизне</option>
        </select>
      </label>
    </div>

    <div class="catalog-page__grid" data-js-catalog-grid>
      ${products.map((product) => ProductTile(product)).join('')}
    </div>

    <nav class="catalog-page__pagination" aria-label="Пагинация" data-js-catalog-pagination>
      <button class="catalog-page__page" type="button" data-js-catalog-page="prev">Назад</button>
      <div class="catalog-page__pagination-pages" data-js-catalog-pagination-pages></div>
      <button class="catalog-page__page" type="button" data-js-catalog-page="next">Вперед</button>
    </nav>
  </div>
</section>`
}

export default CatalogPage