class ProductGallery {
  constructor() {
    this.root = document.querySelector('[data-js-product-gallery]')

    if (!this.root) {
      return
    }

    this.mainImage = this.root.querySelector('[data-js-product-gallery-main-image]')
    this.prevButton = this.root.querySelector('[data-js-product-gallery-prev]')
    this.nextButton = this.root.querySelector('[data-js-product-gallery-next]')
    this.thumbButtons = [...this.root.querySelectorAll('[data-js-product-gallery-thumb]')]

    if (!this.mainImage || !this.thumbButtons.length) {
      return
    }

    this.activeIndex = this.thumbButtons.findIndex((button) => button.classList.contains('is-active'))
    this.activeIndex = this.activeIndex >= 0 ? this.activeIndex : 0

    this.bindEvents()
    this.update(this.activeIndex)
  }

  bindEvents() {
    this.thumbButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.update(index))
    })

    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.update(this.activeIndex - 1))
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.update(this.activeIndex + 1))
    }
  }

  update(nextIndex) {
    const total = this.thumbButtons.length
    this.activeIndex = (nextIndex + total) % total

    const activeButton = this.thumbButtons[this.activeIndex]
    const nextSrc = activeButton.dataset.imageSrc
    const nextAlt = activeButton.dataset.imageAlt || this.mainImage.alt

    this.thumbButtons.forEach((button, index) => {
      button.classList.toggle('is-active', index === this.activeIndex)
    })

    this.mainImage.src = nextSrc
    this.mainImage.alt = nextAlt
  }
}

export default ProductGallery
