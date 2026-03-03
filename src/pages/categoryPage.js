import ProductTile from '@/components/ProductTile/ProductTile'
import Badge from '@/components/Badge/Badge'
import { getCategories, getProductsByCategory } from '@/data/catalogStore'

const texts = {
  women: 'Платья, жакеты и базовые вещи для повседневных и деловых образов.',
  men: 'Комфортные модели на каждый день: от худи и брюк до верхней одежды.',
  outerwear: 'Куртки, тренчи и пальто для любого сезона и городской погоды.',
  accessories: 'Сумки, обувь и детали, которые дополняют образ.',
}

const renderCategoryPage = (categoryKey) => {
  const items = getProductsByCategory(categoryKey)
  const category = getCategories().find((item) => item.key === categoryKey)
  const title = category?.label || 'Категория'
  const text = texts[categoryKey] || 'Подборка товаров категории.'

  return `<section class="category-page">
    <div class="category-page__inner container">
      <div class="category-page__head">
        ${Badge({ label: 'Категория', mode: 'accent' })}
        <h1 class="category-page__title">${title}</h1>
        <p class="category-page__text">${text}</p>
      </div>
      <div class="category-page__grid">
        ${items.map((item) => ProductTile(item)).join('')}
      </div>
    </div>
  </section>`
}

export default renderCategoryPage
