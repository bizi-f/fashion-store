const Button = ({ label, href = '#', mode = 'primary' }) => {
  const className = `button button--${mode}`
  return `<a class="${className}" href="${href}"><span class="button__label">${label}</span></a>`
}

export default Button
