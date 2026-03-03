class ScrollReveal {
  constructor() {
    if (typeof window === 'undefined') {
      return
    }

    if (!('IntersectionObserver' in window)) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const nodes = this.getTargets()
    if (!nodes.length) {
      return
    }

    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    })

    nodes.forEach((node) => {
      node.classList.add('is-reveal-pending')
      this.observer.observe(node)
    })
  }

  getTargets() {
    const selectors = [
      '[data-js-reveal]',
      '.app-shell__content > section',
      '.product-tile',
      '.product-page-related',
      '.product-page-reviews',
      '.product-page-reviews__item',
      '.checkout-page__group',
      '.checkout-page-summary',
      '.catalog-page__chip',
    ]

    const uniqueNodes = new Set()
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((node) => {
        if (node.closest('.site-header') || node.closest('.cart-dialog')) {
          return
        }

        uniqueNodes.add(node)
      })
    })

    return [...uniqueNodes]
  }

  handleIntersect(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return
      }

      entry.target.classList.add('is-reveal-visible')
      this.observer.unobserve(entry.target)
    })
  }
}

export default ScrollReveal
