import Badge from '@/components/Badge/Badge'

const Card = ({ badge, title, text }) => `<article class="card">
  <div class="card__head">${Badge({ label: badge, mode: 'accent' })}</div>
  <h3 class="card__title">${title}</h3>
  <p class="card__text">${text}</p>
</article>`

export default Card
