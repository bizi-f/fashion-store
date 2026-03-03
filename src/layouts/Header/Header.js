import Button from '@/components/Button/Button'
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch'
import { withBase } from '@/lib/sitePath'

const navItems = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/catalog.html' },
  { label: 'Женская', href: '/women.html' },
  { label: 'Мужская', href: '/men.html' },
  { label: 'Контакты', href: '/contacts.html' },
]

const renderNav = (currentPath, isMobile = false) =>
  navItems
    .map(({ label, href }) => {
      const normalizedHref = href === '/' ? '/' : href
      const isActive =
        currentPath === normalizedHref ||
        (currentPath === '/index.html' && normalizedHref === '/')
      const activeClass = isActive ? ' site-header__link--active' : ''
      const mobileAttr = isMobile ? ' data-js-mobile-menu-link' : ''
      return `<a class="site-header__link${activeClass}" href="${withBase(href)}"${mobileAttr}>${label}</a>`
    })
    .join('')

const Header = ({
  currentPath = '/',
} = {}) => `<header class="site-header" data-js-mobile-menu>
  <div class="site-header__container container">
    <div class="site-header__bar">
      <a class="site-header__brand" href="${withBase('/')}" aria-label="Flux Atelier Store">
        <span class="site-header__brand-mark">FA</span>
        <span class="site-header__brand-text">Flux Atelier Store</span>
      </a>

      <nav class="site-header__nav" aria-label="Основная навигация">
        ${renderNav(currentPath)}
      </nav>

      <div class="site-header__actions">
        ${ThemeSwitch()}
        ${Button({ label: 'Каталог', href: withBase('/catalog.html'), mode: 'primary' })}
        <button class="site-header__cart-button" type="button" data-js-cart-open>
          <span class="site-header__cart-label">Корзина</span>
          <span class="site-header__cart-count" data-js-cart-count>0</span>
        </button>
      </div>

      <div class="site-header__mobile-controls">
        <button class="site-header__icon-button site-header__menu-toggle" type="button" aria-label="Открыть меню" data-js-mobile-menu-toggle>
          <span class="site-header__menu-toggle-label">Меню</span>
        </button>
        <button class="site-header__icon-button site-header__icon-button--cart" type="button" aria-label="Открыть корзину" data-js-cart-open>
          <span class="site-header__icon-cart">🛒</span>
          <span class="site-header__cart-count" data-js-cart-count>0</span>
        </button>
      </div>
    </div>
  </div>

  <dialog class="site-header__menu-dialog" data-js-mobile-menu-dialog>
    <div class="site-header__menu-panel">
      <div class="site-header__menu-top">
        <p class="site-header__menu-title">Меню</p>
        <button class="site-header__icon-button" type="button" aria-label="Закрыть меню" data-js-mobile-menu-toggle>
          <span class="site-header__icon-close">✕</span>
        </button>
      </div>
      <nav class="site-header__menu-nav" aria-label="Мобильная навигация">
        ${renderNav(currentPath, true)}
      </nav>
      <div class="site-header__menu-actions">
        ${ThemeSwitch({ className: 'site-header__menu-theme' })}
        ${Button({ label: 'Перейти в каталог', href: withBase('/catalog.html'), mode: 'primary' })}
      </div>
    </div>
  </dialog>

  <dialog class="cart-dialog" data-js-cart-dialog>
    <div class="cart-dialog__panel">
      <div class="cart-dialog__top">
        <h2 class="cart-dialog__title">Корзина</h2>
        <button class="site-header__icon-button" type="button" aria-label="Закрыть корзину" data-js-cart-close>✕</button>
      </div>
      <div class="cart-dialog__body" data-js-cart-items></div>
      <div class="cart-dialog__bottom">
        <p class="cart-dialog__total">Итого: <span data-js-cart-total>0 ₽</span></p>
        <div class="cart-dialog__actions">
          <button class="cart-dialog__action" type="button" data-js-cart-clear>Очистить</button>
          <a class="button button--primary" href="${withBase('/checkout.html')}"><span class="button__label">Оформить</span></a>
        </div>
      </div>
    </div>
  </dialog>

  <div class="cart-toast" role="status" aria-live="polite" data-js-cart-toast>
    <p class="cart-toast__text">🛍️ Товар добавлен в корзину</p>
  </div>
</header>`

export default Header
