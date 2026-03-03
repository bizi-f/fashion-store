import Badge from '@/components/Badge/Badge'
import Button from '@/components/Button/Button'
import { withBase } from '@/lib/sitePath'

const ContactsPage = () => `<section class="contacts-page">
  <div class="contacts-page__inner container">
    <div class="contacts-page__info">
      ${Badge({ label: 'Контакты', mode: 'accent' })}
      <h1 class="contacts-page__title">Мы всегда на связи</h1>
      <p class="contacts-page__text">Поможем выбрать размер, подскажем по доставке и ответим на любые вопросы по заказу.</p>
      <ul class="contacts-page__list">
        <li class="contacts-page__item">Телефон: +7 (900) 123-45-67</li>
        <li class="contacts-page__item">Email: support@fluxstore.ru</li>
        <li class="contacts-page__item">Адрес: Москва, ул. Петровка, 21</li>
      </ul>
      <p class="contacts-page__hours">Ежедневно с 09:00 до 21:00</p>
    </div>

    <form class="contacts-page__form" action="#" method="post">
      <label class="contacts-page__field">
        <span class="contacts-page__label">Имя</span>
        <input class="contacts-page__input" type="text" placeholder="Ваше имя" required>
      </label>
      <label class="contacts-page__field">
        <span class="contacts-page__label">Email</span>
        <input class="contacts-page__input" type="email" placeholder="Ваш email" required>
      </label>
      <label class="contacts-page__field">
        <span class="contacts-page__label">Комментарий</span>
        <textarea class="contacts-page__textarea" placeholder="Что вас интересует?" rows="4"></textarea>
      </label>
      ${Button({ label: 'Отправить заявку', href: '#', mode: 'primary' })}
    </form>
  </div>
</section>

<section class="contacts-page-map">
  <div class="contacts-page-map__inner container">
    <img class="contacts-page-map__image" src="${withBase('/images/placeholders/map-placeholder.svg')}" alt="Схема расположения магазина" loading="lazy" />
  </div>
</section>

<section class="contacts-page-faq">
  <div class="contacts-page-faq__inner container">
    <h2 class="contacts-page-faq__title">Частые вопросы</h2>
    <div class="contacts-page-faq__list">
      <article class="contacts-page-faq__item">
        <h3 class="contacts-page-faq__question">Как выбрать размер?</h3>
        <p class="contacts-page-faq__answer">В карточке каждого товара есть таблица размеров и рекомендации по посадке.</p>
      </article>
      <article class="contacts-page-faq__item">
        <h3 class="contacts-page-faq__question">Как быстро отправляется заказ?</h3>
        <p class="contacts-page-faq__answer">Обычно отправляем в течение 24 часов после подтверждения оплаты.</p>
      </article>
      <article class="contacts-page-faq__item">
        <h3 class="contacts-page-faq__question">Можно ли вернуть товар?</h3>
        <p class="contacts-page-faq__answer">Да, в течение 14 дней, если сохранены товарный вид и бирки.</p>
      </article>
    </div>
  </div>
</section>`

export default ContactsPage
