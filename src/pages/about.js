import Badge from '@/components/Badge/Badge'
import Card from '@/components/Card/Card'

const values = [
  { badge: 'Доступно', title: 'Честные цены', text: 'Мы держим комфортный ценовой диапазон и регулярно запускаем акции.' },
  { badge: 'Удобно', title: 'Быстрый заказ', text: 'Оформление занимает пару минут, а статус доставки виден в личном кабинете.' },
  { badge: 'Надежно', title: 'Контроль качества', text: 'Перед отправкой каждый заказ проверяется на соответствие размеру и состоянию.' },
]

const AboutPage = () => `<section class="about-page">
  <div class="about-page__inner container">
    ${Badge({ label: 'О бренде', mode: 'accent' })}
    <h1 class="about-page__title">Flux Atelier Store</h1>
    <p class="about-page__text">Мы делаем стильную и доступную одежду, которую удобно носить каждый день.</p>
    <p class="about-page__text">Наша цель проста: хорошие материалы, понятные размеры и честная цена без переплаты за бренд.</p>
  </div>
</section>

<section class="about-page-values">
  <div class="about-page-values__inner container">
    <div class="about-page-values__grid">
      ${values.map((item) => Card(item)).join('')}
    </div>
  </div>
</section>

<section class="about-page-facts">
  <div class="about-page-facts__inner container">
    <article class="about-page-facts__item">
      <h2 class="about-page-facts__value">250 000+</h2>
      <p class="about-page-facts__label">заказов по России</p>
    </article>
    <article class="about-page-facts__item">
      <h2 class="about-page-facts__value">4.8 / 5</h2>
      <p class="about-page-facts__label">средняя оценка клиентов</p>
    </article>
    <article class="about-page-facts__item">
      <h2 class="about-page-facts__value">14 дней</h2>
      <p class="about-page-facts__label">на обмен и возврат</p>
    </article>
  </div>
</section>`

export default AboutPage
