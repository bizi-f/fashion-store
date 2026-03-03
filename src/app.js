import Header from '@/layouts/Header/Header'
import Footer from '@/layouts/Footer/Footer'

const App = (pageContent, options = {}) => `<div class="app-shell">
  ${Header(options)}
  <main class="app-shell__content">${pageContent}</main>
  ${Footer()}
</div>`

export default App
