class CatalogFilters {
  constructor() {
    this.root = document.querySelector('[data-js-catalog]')

    if (!this.root) {
      return
    }

    this.filterButtons = [
      ...this.root.querySelectorAll('[data-js-catalog-filter]'),
    ]
    this.sortSelect = this.root.querySelector('[data-js-catalog-sort]')
    this.grid = this.root.querySelector('[data-js-catalog-grid]')
    this.cards = [...this.root.querySelectorAll('[data-js-product-tile]')]
    this.pagination = this.root.querySelector('[data-js-catalog-pagination]')
    this.paginationPages = this.root.querySelector(
      '[data-js-catalog-pagination-pages]'
    )
    this.prevPageButton = this.root.querySelector(
      '[data-js-catalog-page="prev"]'
    )
    this.nextPageButton = this.root.querySelector(
      '[data-js-catalog-page="next"]'
    )

    if (!this.grid || !this.cards.length) {
      return
    }

    this.cards.forEach((card, index) => {
      card.dataset.order = String(index)
    })

    this.activeFilter = 'all'
    this.currentPage = 1
    this.itemsPerPage = this.getItemsPerPage()
    this.totalPages = 1

    this.applyInitialFilter()
    this.bindEvents()
    this.apply({ resetPage: true })
  }

  getItemsPerPage() {
    if (typeof window === 'undefined') {
      return 9
    }

    if (window.innerWidth <= 767) {
      return 3
    }

    if (window.innerWidth <= 1023) {
      return 6
    }

    return 9
  }

  applyInitialFilter() {
    const searchParams = new URLSearchParams(window.location.search)
    const queryFilter = searchParams.get('category')
    if (!queryFilter) {
      return
    }

    const matchedButton = this.filterButtons.find(
      (button) => button.dataset.jsCatalogFilter === queryFilter
    )
    if (!matchedButton) {
      return
    }

    this.activeFilter = queryFilter
    this.filterButtons.forEach((node) => {
      node.classList.toggle('is-active', node === matchedButton)
    })
  }

  bindEvents() {
    this.filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.jsCatalogFilter || 'all'
        this.activeFilter = filter

        this.filterButtons.forEach((node) => {
          node.classList.toggle('is-active', node === button)
        })

        this.apply({ resetPage: true })
      })
    })

    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', () =>
        this.apply({ resetPage: true })
      )
    }

    if (this.prevPageButton) {
      this.prevPageButton.addEventListener('click', () => {
        this.goToPage(this.currentPage - 1)
      })
    }

    if (this.nextPageButton) {
      this.nextPageButton.addEventListener('click', () => {
        this.goToPage(this.currentPage + 1)
      })
    }

    if (this.paginationPages) {
      this.paginationPages.addEventListener('click', (event) => {
        const button = event.target.closest('[data-js-catalog-page-number]')
        if (!button) {
          return
        }

        const page = Number(button.dataset.jsCatalogPageNumber)
        this.goToPage(page)
      })
    }

    window.addEventListener('resize', () => {
      const nextItemsPerPage = this.getItemsPerPage()
      if (nextItemsPerPage === this.itemsPerPage) {
        return
      }

      this.itemsPerPage = nextItemsPerPage
      this.apply()
    })
  }

  goToPage(page) {
    if (!Number.isFinite(page) || page < 1 || page > this.totalPages) {
      return
    }

    if (page === this.currentPage) {
      return
    }

    this.currentPage = page
    this.renderPage()
    this.renderPagination()
  }

  apply({ resetPage = false } = {}) {
    const visibleCards = this.cards.filter((card) => {
      const matches =
        this.activeFilter === 'all' ||
        card.dataset.categoryKey === this.activeFilter
      card.classList.toggle('is-hidden', !matches)
      return matches
    })

    const sortValue = this.sortSelect ? this.sortSelect.value : 'popular'
    const sorted = [...visibleCards].sort((a, b) => {
      const priceA = Number(a.dataset.price)
      const priceB = Number(b.dataset.price)
      const orderA = Number(a.dataset.order)
      const orderB = Number(b.dataset.order)

      if (sortValue === 'cheap') {
        return priceA - priceB
      }

      if (sortValue === 'expensive') {
        return priceB - priceA
      }

      if (sortValue === 'new') {
        return orderB - orderA
      }

      return orderA - orderB
    })

    this.sortedCards = sorted
    this.totalPages = Math.max(
      1,
      Math.ceil(this.sortedCards.length / this.itemsPerPage)
    )

    if (resetPage) {
      this.currentPage = 1
    } else {
      this.currentPage = Math.min(this.currentPage, this.totalPages)
    }

    this.renderOrder()
    this.renderPage()
    this.renderPagination()
  }

  renderOrder() {
    if (!this.sortedCards || !this.grid) {
      return
    }

    this.sortedCards.forEach((card) => {
      this.grid.append(card)
    })
  }

  renderPage() {
    if (!this.sortedCards) {
      return
    }

    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage

    this.sortedCards.forEach((card, index) => {
      const isOutOfPage = index < start || index >= end
      card.classList.toggle('is-hidden', isOutOfPage)
    })
  }

  renderPagination() {
    if (!this.pagination || !this.paginationPages) {
      return
    }

    const shouldHidePagination = this.totalPages <= 1
    this.pagination.hidden = shouldHidePagination

    if (shouldHidePagination) {
      if (this.prevPageButton) {
        this.prevPageButton.disabled = true
      }

      if (this.nextPageButton) {
        this.nextPageButton.disabled = true
      }

      this.paginationPages.innerHTML = ''
      return
    }

    const pageButtons = Array.from({ length: this.totalPages }, (_, index) => {
      const page = index + 1
      const isActive = page === this.currentPage ? ' is-active' : ''
      return `<button class="catalog-page__page${isActive}" type="button" data-js-catalog-page-number="${page}">${page}</button>`
    }).join('')

    this.paginationPages.innerHTML = pageButtons

    if (this.prevPageButton) {
      this.prevPageButton.disabled = this.currentPage === 1
    }

    if (this.nextPageButton) {
      this.nextPageButton.disabled = this.currentPage === this.totalPages
    }
  }
}

export default CatalogFilters
