const THEME_STORAGE_KEY = 'flux-theme'

class ThemeSwitcher {
  constructor() {
    this.root = document.documentElement
    this.buttons = [...document.querySelectorAll('[data-js-theme-toggle]')]
    this.textNodes = [...document.querySelectorAll('[data-js-theme-toggle-text]')]

    if (!this.buttons.length) {
      return
    }

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    const initialTheme = storedTheme === 'dark' ? 'dark' : 'light'
    this.setTheme(initialTheme)

    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const nextTheme = this.root.dataset.theme === 'dark' ? 'light' : 'dark'
        this.setTheme(nextTheme)
      })
    })
  }

  setTheme(theme) {
    this.root.dataset.theme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    const nextLabel = theme === 'dark' ? 'Светлая' : 'Темная'
    this.textNodes.forEach((node) => {
      node.textContent = nextLabel
    })
  }
}

export default ThemeSwitcher
