export default function HomeSection({
  className = 'section',
  title,
  subtitle,
  to,
  right,
  children,
}) {
  return (
    <section className={className}>
      <div className="section-header">
        <h2 className="section-title">
          {title}
          {subtitle ? ` / ${subtitle}` : ''}
        </h2>

        {right ? (
          right
        ) : to ? (
          <a href={to} className="more-link">
            VIEW ALL <i className="fa-solid fa-circle-arrow-right"></i>
          </a>
        ) : (
          <span />
        )}
      </div>

      {children}
    </section>
  )
}
