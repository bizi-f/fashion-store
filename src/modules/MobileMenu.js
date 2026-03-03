class MobileMenu {
  constructor() {
    this.root = document.querySelector('[data-js-mobile-menu]')
    this.dialog = document.querySelector('[data-js-mobile-menu-dialog]')

    if (!this.root || !this.dialog) {
      return
    }

    this.toggles = [...document.querySelectorAll('[data-js-mobile-menu-toggle]')]
    this.links = [...document.querySelectorAll('[data-js-mobile-menu-link]')]

    this.bindEvents()
  }

  bindEvents() {
    this.toggles.forEach((button) => {
      button.addEventListener('click', () => {
        if (this.dialog.open) {
          this.dialog.close()
          return
        }

        this.dialog.showModal()
      })
    })

    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        if (this.dialog.open) {
          this.dialog.close()
        }
      })
    })

    this.dialog.addEventListener('click', (event) => {
      if (event.target === this.dialog) {
        this.dialog.close()
      }
    })
  }
}

export default MobileMenu
