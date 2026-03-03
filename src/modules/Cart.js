const CART_STORAGE_KEY = 'flux-cart-items'

class Cart {
  constructor() {
    this.dialog = document.querySelector('[data-js-cart-dialog]')
    this.itemsRoot = document.querySelector('[data-js-cart-items]')
    this.totalNode = document.querySelector('[data-js-cart-total]')
    this.countNodes = [...document.querySelectorAll('[data-js-cart-count]')]
    this.toastNode = document.querySelector('[data-js-cart-toast]')
    this.toastTimer = null

    if (!this.dialog || !this.itemsRoot || !this.totalNode) {
      return
    }

    this.items = this.loadItems()
    this.openButtons = [...document.querySelectorAll('[data-js-cart-open]')]
    this.closeButtons = [...document.querySelectorAll('[data-js-cart-close]')]
    this.clearButtons = [...document.querySelectorAll('[data-js-cart-clear]')]

    this.bindEvents()
    this.render()
  }

  bindEvents() {
    this.openButtons.forEach((button) => {
      button.addEventListener('click', () => this.dialog.showModal())
    })

    this.closeButtons.forEach((button) => {
      button.addEventListener('click', () => this.dialog.close())
    })

    this.clearButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.items = []
        this.saveItems()
        this.render()
      })
    })

    this.dialog.addEventListener('click', (event) => {
      if (event.target === this.dialog) {
        this.dialog.close()
        return
      }

      const removeButton = event.target.closest('[data-js-cart-remove]')
      if (removeButton) {
        const id = removeButton.dataset.jsCartRemove
        this.items = this.items.filter((item) => item.id !== id)
        this.saveItems()
        this.render()
      }
    })

    document.addEventListener('click', (event) => {
      const addButton = event.target.closest('[data-js-cart-add]')
      if (!addButton) {
        return
      }

      event.preventDefault()
      this.addItem({
        productId: addButton.dataset.productId,
        title: addButton.dataset.productTitle,
        price: Number(addButton.dataset.productPrice),
        size: this.resolveItemSize(addButton),
        image: addButton.dataset.productImage,
      })
      this.animateAddFeedback(addButton)
      this.showAddToast(addButton.dataset.productTitle)

      const tile = addButton.closest('[data-js-product-tile]')
      if (tile) {
        tile.classList.add('is-in-cart')
        setTimeout(() => tile.classList.remove('is-in-cart'), 850)
      }
    })
  }

  animateAddFeedback(addButton) {
    addButton.classList.remove('is-added')
    void addButton.offsetWidth
    addButton.classList.add('is-added')
    setTimeout(() => addButton.classList.remove('is-added'), 520)

    this.countNodes.forEach((node) => {
      node.classList.remove('is-bump')
      void node.offsetWidth
      node.classList.add('is-bump')
      setTimeout(() => node.classList.remove('is-bump'), 520)
    })

    this.openButtons.forEach((button) => {
      const isCartTrigger =
        button.classList.contains('site-header__cart-button') ||
        button.classList.contains('site-header__icon-button--cart')

      if (!isCartTrigger) {
        return
      }

      button.classList.remove('is-pulse')
      void button.offsetWidth
      button.classList.add('is-pulse')
      setTimeout(() => button.classList.remove('is-pulse'), 520)
    })
  }

  resolveItemSize(addButton) {
    const productPage = addButton.closest('.product-page')
    if (productPage) {
      const checked = productPage.querySelector(
        'input[name="product-size"]:checked'
      )
      if (checked?.value) {
        return checked.value
      }
    }

    return addButton.dataset.productSize || 'One Size'
  }

  addItem(item) {
    if (!item.productId || !item.title || Number.isNaN(item.price)) {
      return
    }

    const size = item.size || 'One Size'
    const id = `${item.productId}::${size}`
    const existing = this.items.find((stored) => stored.id === id)

    if (existing) {
      existing.quantity += 1
    } else {
      this.items.push({
        id,
        productId: item.productId,
        title: item.title,
        price: item.price,
        size,
        image: item.image,
        quantity: 1,
      })
    }

    this.saveItems()
    this.render()
  }

  render() {
    const totalQuantity = this.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
    const totalPrice = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    this.countNodes.forEach((node) => {
      node.textContent = String(totalQuantity)
    })

    this.totalNode.textContent = this.formatPrice(totalPrice)

    if (!this.items.length) {
      this.itemsRoot.innerHTML =
        '<p class="cart-dialog__empty">Корзина пока пуста. Добавьте товары из каталога.</p>'
      return
    }

    this.itemsRoot.innerHTML = this.items
      .map(
        (item) => `<article class="cart-dialog__item">
          <img class="cart-dialog__thumb" src="${item.image}" alt="" loading="lazy" />
          <div class="cart-dialog__item-content">
            <p class="cart-dialog__item-title">${item.title}</p>
            <p class="cart-dialog__item-meta">${item.quantity} × ${this.formatPrice(item.price)} • ${item.size}</p>
          </div>
          <button class="cart-dialog__remove" type="button" data-js-cart-remove="${item.id}">Удалить</button>
        </article>`
      )
      .join('')
  }

  showAddToast(productTitle = '') {
    if (!this.toastNode) {
      return
    }

    const textNode = this.toastNode.querySelector('.cart-toast__text')
    if (textNode) {
      const trimmedTitle = String(productTitle || '').trim()
      textNode.textContent = trimmedTitle
        ? `🛍️ Добавлено: ${trimmedTitle}`
        : '🛍️ Товар добавлен в корзину'
    }

    this.toastNode.classList.add('is-visible')

    if (this.toastTimer) {
      clearTimeout(this.toastTimer)
    }

    this.toastTimer = setTimeout(() => {
      this.toastNode.classList.remove('is-visible')
      this.toastTimer = null
    }, 1900)
  }

  formatPrice(value) {
    return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
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

  saveItems() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items))
  }
}

export default Cart
