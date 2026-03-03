import Badge from '@/components/Badge/Badge'
import Card from '@/components/Card/Card'
import Button from '@/components/Button/Button'
import ProductTile from '@/components/ProductTile/ProductTile'
import { withBase } from '@/lib/sitePath'
import { getCategories, getProducts } from '@/data/catalogStore'

const styleCards = [
  {
    badge: 'Удобный выбор',
    title: 'Готовые сочетания на каждый день',
    text: 'Собрали вещи, которые легко комбинировать между собой без долгого подбора.',
  },
  {
    badge: 'Комфорт',
    title: 'Размеры от XS до 3XL',
    text: 'Подробная размерная сетка и понятные фото помогают выбрать с первого раза.',
  },
]

const tickerItems = [
  'Новая коллекция весна-лето',
  'Доставка по РФ 1-3 дня',
  'Скидки до 40% на selected items',
  'Обмен и возврат 14 дней',
  'Бонусы за каждую покупку',
]

const HomePage = () => {
  const previewProducts = getProducts().slice(0, 4)
  const categories = getCategories()

  return `<section class="hero" id="new">
  <div class="hero__inner container" data-js-reveal>
    ${Badge({ label: 'Магазин одежды онлайн', mode: 'accent' })}
    <h1 class="hero__title">Стильная одежда на каждый день по разумным ценам</h1>
    <p class="hero__text">Выбирайте базовые и трендовые модели, оформляйте заказ за пару минут и получайте доставку по всей России.</p>
    <div class="hero__chips">
      <span class="hero__chip">Новые поступления каждую неделю</span>
      <span class="hero__chip">Быстрая доставка по РФ</span>
      <span class="hero__chip">Скидки до 40%</span>
    </div>

    <div class="hero__scene" aria-hidden="true">
      <article class="hero__floating hero__floating--catalog">
        <p class="hero__floating-title">Коллекция Weekday Mix</p>
        <p class="hero__floating-text">12 готовых образов на каждый день</p>
      </article>
      <article class="hero__floating hero__floating--price">
        <p class="hero__floating-value">от 1 990 ₽</p>
        <p class="hero__floating-text">Базовые модели в наличии</p>
      </article>
      <article class="hero__floating hero__floating--delivery">
        <p class="hero__floating-title">Доставка 1-3 дня</p>
        <p class="hero__floating-text">По Москве и регионам</p>
      </article>
      <article class="hero__floating hero__floating--sale">
        <p class="hero__floating-value">-40%</p>
        <p class="hero__floating-text">Сезонные скидки</p>
      </article>
    </div>

    <div class="hero__actions">
      ${Button({ label: 'Перейти в каталог', href: withBase('/catalog.html'), mode: 'primary' })}
      ${Button({ label: 'Смотреть товар', href: withBase('/product.html?id=product-01'), mode: 'ghost' })}
    </div>
  </div>
</section>

<section class="home-ticker" aria-label="Промо-объявления">
  <div class="home-ticker__track">
    ${[...tickerItems, ...tickerItems]
      .map((item) => `<span class="home-ticker__item">${item}</span>`)
      .join('')}
  </div>
</section>

<section class="home-page-categories">
  <div class="home-page-categories__inner container">
    ${categories.map((item) => `<a class="home-page-categories__item" href="${withBase(item.href)}">${item.label}</a>`).join('')}
  </div>
</section>

<section class="showcase">
  <div class="showcase__inner container">
    <div class="showcase__cards">
      ${styleCards.map((card) => Card(card)).join('')}
    </div>
  </div>
</section>

<section class="home-page-products">
  <div class="home-page-products__inner container">
    <div class="home-page-products__head">
      <h2 class="home-page-products__title">Хиты недели</h2>
      <a class="home-page-products__link" href="${withBase('/catalog.html')}">Смотреть все</a>
    </div>
    <div class="home-page-products__grid">
      ${previewProducts.map((product) => ProductTile(product)).join('')}
    </div>
  </div>
</section>

<section class="home-page-newsletter">
  <div class="home-page-newsletter__inner container">
    <div class="home-page-newsletter__content">
      <h2 class="home-page-newsletter__title">Узнавайте о скидках первыми</h2>
      <p class="home-page-newsletter__text">Подпишитесь на рассылку и получайте подборки новинок и персональные промокоды.</p>
    </div>
    <form class="home-page-newsletter__form" action="#" method="post">
      <input class="home-page-newsletter__input" type="email" placeholder="Ваш email" required>
      <button class="home-page-newsletter__submit" type="submit">Подписаться</button>
    </form>
  </div>
</section>`
}

export default HomePage
