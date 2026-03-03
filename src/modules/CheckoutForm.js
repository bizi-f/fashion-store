const CART_STORAGE_KEY = 'flux-cart-items'
const DELIVERY_PRICE = 390

const API_BASE = (() => {
  const envBase = String(import.meta.env.VITE_API_BASE_URL || '').trim()
  if (envBase) {
    return envBase.endsWith('/') ? envBase.slice(0, -1) : envBase
  }

  if (typeof window === 'undefined') {
    return 'http://localhost:4000'
  }

  const { hostname, port, origin } = window.location
  const isLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1'

  if (isLocal && port !== '4000') {
    return 'http://localhost:4000'
  }

  return origin
})()

class CheckoutForm {
  constructor() {
    this.form = document.querySelector('[data-js-checkout-form]')
    this.statusNode = document.querySelector('[data-js-checkout-status]')
    this.summaryRoot = document.querySelector('[data-js-checkout-summary-items]')
    this.subtotalNode = document.querySelector('[data-js-checkout-subtotal]')
    this.deliveryNode = document.querySelector('[data-js-checkout-delivery]')
    this.totalNode = document.querySelector('[data-js-checkout-total]')
    this.paymentErrorNode = document.querySelector('[data-js-payment-error]')
    this.consentErrorNode = document.querySelector('[data-js-consent-error]')

    if (
      !this.form ||
      !this.statusNode ||
      !this.summaryRoot ||
      !this.subtotalNode ||
      !this.deliveryNode ||
      !this.totalNode
    ) {
      return
    }

    this.inputs = [...this.form.querySelectorAll('[data-js-checkout-input]')]
    this.bindEvents()
    this.renderSummary()
  }

  bindEvents() {
    this.inputs.forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input))
      input.addEventListener('input', () => this.clearFieldError(input))
      input.addEventListener('change', () => this.clearFieldError(input))
    })

    this.form.addEventListener('submit', async (event) => {
      event.preventDefault()
      const isValid = this.validateForm()
      if (!isValid) {
        this.setStatus('Проверьте, пожалуйста, заполнение полей.', true)
        return
      }

      await this.handleSuccessSubmit()
    })
  }

  validateForm() {
    const items = this.loadItems()
    if (!items.length) {
      this.setStatus('Корзина пуста. Добавьте товары перед оформлением.', true)
      return false
    }

    let isFormValid = true
    this.inputs.forEach((input) => {
      const isFieldValid = this.validateField(input)
      if (!isFieldValid) {
        isFormValid = false
      }
    })
    return isFormValid
  }

  validateField(input) {
    let message = ''
    const value = input.value.trim()
    const fieldName = input.name

    if (input.type === 'radio') {
      const checked = this.form.querySelector(`input[name="${fieldName}"]:checked`)
      message = checked ? '' : 'Выберите способ оплаты.'
      this.paymentErrorNode.textContent = message
      input.setCustomValidity(message)
      return !message
    }

    if (input.type === 'checkbox') {
      message = input.checked ? '' : 'Необходимо согласие на обработку данных.'
      this.consentErrorNode.textContent = message
      input.setCustomValidity(message)
      return !message
    }

    if (!value && input.required) {
      message = 'Заполните это поле.'
    } else if (fieldName === 'fullName') {
      const wordsCount = value.split(/\s+/).filter(Boolean).length
      if (wordsCount < 2) {
        message = 'Укажите имя и фамилию.'
      }
    } else if (fieldName === 'phone') {
      const digits = value.replace(/\D/g, '')
      if (digits.length < 10) {
        message = 'Введите корректный номер телефона.'
      }
    } else if (fieldName === 'email' && input.validity.typeMismatch) {
      message = 'Введите корректный email.'
    } else if (fieldName === 'house' && !/^[\dа-яА-Яa-zA-Z\-/]+$/.test(value)) {
      message = 'Проверьте номер дома.'
    }

    input.setCustomValidity(message)
    const errorNode = input
      .closest('.checkout-page__field')
      ?.querySelector('[data-js-field-error]')
    if (errorNode) {
      errorNode.textContent = message
    }
    return !message
  }

  clearFieldError(input) {
    if (input.type === 'radio') {
      this.paymentErrorNode.textContent = ''
      return
    }

    if (input.type === 'checkbox') {
      this.consentErrorNode.textContent = ''
      return
    }

    const errorNode = input
      .closest('.checkout-page__field')
      ?.querySelector('[data-js-field-error]')
    if (errorNode) {
      errorNode.textContent = ''
    }
  }

  renderSummary() {
    const items = this.loadItems()
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const delivery = items.length ? DELIVERY_PRICE : 0
    const total = subtotal + delivery

    this.subtotalNode.textContent = this.formatPrice(subtotal)
    this.deliveryNode.textContent = this.formatPrice(delivery)
    this.totalNode.textContent = this.formatPrice(total)

    if (!items.length) {
      this.summaryRoot.innerHTML =
        '<p class="checkout-page-summary__empty">Корзина пуста. Добавьте товары, чтобы оформить заказ.</p>'
      return
    }

    this.summaryRoot.innerHTML = items
      .map(
        (item) => `<article class="checkout-page-summary__item">
          <img class="checkout-page-summary__thumb" src="${item.image}" alt="" loading="lazy" />
          <div class="checkout-page-summary__item-content">
            <p class="checkout-page-summary__item-title">${item.title}</p>
            <p class="checkout-page-summary__item-meta">${item.quantity} × ${this.formatPrice(item.price)} • ${item.size || 'One Size'}</p>
          </div>
        </article>`
      )
      .join('')
  }

  async handleSuccessSubmit() {
    const items = this.loadItems()
    const formData = new FormData(this.form)

    const deliveryAddress = [
      String(formData.get('city') || '').trim(),
      String(formData.get('street') || '').trim(),
      String(formData.get('house') || '').trim(),
      String(formData.get('apartment') || '').trim(),
    ]
      .filter(Boolean)
      .join(', ')

    const payload = {
      items: items.map((item) => ({
        productId: item.productId || item.id,
        quantity: Number(item.quantity || 1),
        size: String(item.size || 'One Size'),
      })),
      contact: {
        fullName: String(formData.get('fullName') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
        email: String(formData.get('email') || '').trim(),
      },
      paymentMethod: String(formData.get('paymentMethod') || '').trim(),
      deliveryInfo: {
        method: String(formData.get('deliveryMethod') || '').trim(),
        address: deliveryAddress,
        comment: String(formData.get('comment') || '').trim(),
      },
    }

    try {
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.status}`)
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]))
      this.form.reset()
      this.setStatus('Заказ оформлен. Менеджер свяжется с вами в ближайшее время.')
      this.renderSummary()
      this.updateCartCounters()
    } catch {
      this.setStatus('Не удалось оформить заказ. Повторите попытку через минуту.', true)
    }
  }

  updateCartCounters() {
    const countNodes = [...document.querySelectorAll('[data-js-cart-count]')]
    countNodes.forEach((node) => {
      node.textContent = '0'
    })
  }

  setStatus(text, isError = false) {
    this.statusNode.textContent = text
    this.statusNode.classList.toggle('is-error', isError)
  }

  loadItems() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  formatPrice(value) {
    return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
  }
}

export default CheckoutForm
