const ThemeSwitch = ({ className = '' } = {}) => {
  const classes = ['theme-switch']

  if (className) {
    classes.push(className)
  }

  return `<button class="${classes.join(' ')}" type="button" data-js-theme-toggle>
    <span class="theme-switch__text" data-js-theme-toggle-text>Темная</span>
  </button>`
}

export default ThemeSwitch
