import { Link } from 'react-router-dom'

export default function HomeSection({
  className = 'section',
  title,
  subtitle,
  to,
  children,
}) {
  return (
    <section className={className}>
      <div className="section-header">
        <h2 className="section-title">
          {title}
          {subtitle ? ` / ${subtitle}` : ''}
        </h2>

        {to && (
          <Link to={to} className="more-link">
            VIEW ALL <i className="fa-solid fa-circle-arrow-right"></i>
          </Link>
        )}
      </div>

      {children}
    </section>
  )
}
