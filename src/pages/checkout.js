import Badge from '@/components/Badge/Badge'
import { withBase } from '@/lib/sitePath'

const CheckoutPage = () => `<section class="checkout-page">
  <div class="checkout-page__inner container">
    <div class="checkout-page__head">
      ${Badge({ label: 'Оформление заказа', mode: 'accent' })}
      <h1 class="checkout-page__title">Заполните данные для доставки и оплаты</h1>
      <p class="checkout-page__text">Проверьте товары, укажите контактные данные и выберите удобный способ получения.</p>
    </div>

    <div class="checkout-page__layout">
      <form class="checkout-page__form" action="#" method="post" data-js-checkout-form novalidate>
        <section class="checkout-page__group">
          <h2 class="checkout-page__group-title">Контактные данные</h2>
          <label class="checkout-page__field">
            <span class="checkout-page__label">Имя и фамилия</span>
            <input class="checkout-page__input" type="text" name="fullName" placeholder="Иван Петров" autocomplete="name" required data-js-checkout-input />
            <span class="checkout-page__error" data-js-field-error></span>
          </label>
          <label class="checkout-page__field">
            <span class="checkout-page__label">Телефон</span>
            <input class="checkout-page__input" type="tel" name="phone" placeholder="+7 999 123-45-67" autocomplete="tel" required data-js-checkout-input />
            <span class="checkout-page__error" data-js-field-error></span>
          </label>
          <label class="checkout-page__field">
            <span class="checkout-page__label">Email</span>
            <input class="checkout-page__input" type="email" name="email" placeholder="name@example.com" autocomplete="email" required data-js-checkout-input />
            <span class="checkout-page__error" data-js-field-error></span>
          </label>
        </section>

        <section class="checkout-page__group">
          <h2 class="checkout-page__group-title">Доставка</h2>
          <label class="checkout-page__field">
            <span class="checkout-page__label">Способ получения</span>
            <select class="checkout-page__input" name="deliveryMethod" required data-js-checkout-input>
              <option value="">Выберите вариант</option>
              <option value="courier">Курьером до двери</option>
              <option value="pickup">Самовывоз из пункта выдачи</option>
            </select>
            <span class="checkout-page__error" data-js-field-error></span>
          </label>
          <div class="checkout-page__grid">
            <label class="checkout-page__field">
              <span class="checkout-page__label">Город</span>
              <input class="checkout-page__input" type="text" name="city" placeholder="Москва" autocomplete="address-level2" required data-js-checkout-input />
              <span class="checkout-page__error" data-js-field-error></span>
            </label>
            <label class="checkout-page__field">
              <span class="checkout-page__label">Улица</span>
              <input class="checkout-page__input" type="text" name="street" placeholder="Петровка" autocomplete="address-line1" required data-js-checkout-input />
              <span class="checkout-page__error" data-js-field-error></span>
            </label>
            <label class="checkout-page__field">
              <span class="checkout-page__label">Дом</span>
              <input class="checkout-page__input" type="text" name="house" placeholder="21" required data-js-checkout-input />
              <span class="checkout-page__error" data-js-field-error></span>
            </label>
            <label class="checkout-page__field">
              <span class="checkout-page__label">Квартира (необязательно)</span>
              <input class="checkout-page__input" type="text" name="apartment" placeholder="45" />
              <span class="checkout-page__error" data-js-field-error></span>
            </label>
          </div>
          <label class="checkout-page__field">
            <span class="checkout-page__label">Комментарий к заказу</span>
            <textarea class="checkout-page__textarea" name="comment" rows="3" placeholder="Например: позвоните за 30 минут"></textarea>
          </label>
        </section>

        <section class="checkout-page__group">
          <h2 class="checkout-page__group-title">Оплата</h2>
          <div class="checkout-page__radio-list" data-js-checkout-payment-group>
            <label class="checkout-page__radio">
              <input class="checkout-page__radio-input" type="radio" name="paymentMethod" value="card" data-js-checkout-input required />
              <span class="checkout-page__radio-label">Банковская карта</span>
            </label>
            <label class="checkout-page__radio">
              <input class="checkout-page__radio-input" type="radio" name="paymentMethod" value="sbp" data-js-checkout-input required />
              <span class="checkout-page__radio-label">СБП</span>
            </label>
            <label class="checkout-page__radio">
              <input class="checkout-page__radio-input" type="radio" name="paymentMethod" value="cash" data-js-checkout-input required />
              <span class="checkout-page__radio-label">Наличными при получении</span>
            </label>
          </div>
          <span class="checkout-page__error" data-js-payment-error></span>
        </section>

        <label class="checkout-page__consent">
          <input class="checkout-page__consent-input" type="checkbox" name="consent" required data-js-checkout-input />
          <span class="checkout-page__consent-label">Согласен на обработку персональных данных и условия оформления заказа</span>
        </label>
        <span class="checkout-page__error" data-js-consent-error></span>

        <div class="checkout-page__actions">
          <button class="button button--primary" type="submit"><span class="button__label">Подтвердить заказ</span></button>
          <a class="button button--ghost" href="${withBase('/catalog.html')}"><span class="button__label">Вернуться в каталог</span></a>
        </div>

        <p class="checkout-page__status" data-js-checkout-status></p>
      </form>

      <aside class="checkout-page-summary" data-js-checkout-summary>
        <h2 class="checkout-page-summary__title">Ваш заказ</h2>
        <div class="checkout-page-summary__body" data-js-checkout-summary-items></div>
        <div class="checkout-page-summary__totals">
          <p class="checkout-page-summary__line">Товары: <span data-js-checkout-subtotal>0 ₽</span></p>
          <p class="checkout-page-summary__line">Доставка: <span data-js-checkout-delivery>0 ₽</span></p>
          <p class="checkout-page-summary__line checkout-page-summary__line--total">Итого: <span data-js-checkout-total>0 ₽</span></p>
        </div>
      </aside>
    </div>
  </div>
</section>`

export default CheckoutPage
