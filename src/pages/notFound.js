import { withBase } from '@/lib/sitePath'

const NotFoundPage = () => `<section class="not-found">
  <div class="not-found__inner container">
    <h1 class="not-found__title">404</h1>
    <p class="not-found__text">Страница не найдена</p>
    <a class="not-found__link" href="${withBase('/')}" >Вернуться на главную</a>
  </div>
</section>`

export default NotFoundPage
