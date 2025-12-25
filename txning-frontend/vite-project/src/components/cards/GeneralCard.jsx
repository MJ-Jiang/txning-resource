export default function GeneralCard({ item }) {
  if (!item) return null

  const href = item.linkUrl
  const clickable = Boolean(href)

  const cover = item.posterUrl
  const platform = item.platform // 直接用中文
  const type = item.type // '图片' | '视频'
  const desc = item.desc ?? ''
  const alt = item.alt ?? item.title ?? desc ?? ''

  const CardInner = (
    <div
      className={`general-card ${clickable ? 'is-clickable' : 'is-disabled'}`}
    >
      <div className="general-media">
        {cover ? (
          <img className="general-thumb" src={cover} alt={alt} loading="lazy" />
        ) : (
          <div className="general-thumb general-thumb--placeholder" />
        )}

        {platform && <div className="general-badge">{platform}</div>}
        {type && <div className="general-type">{type}</div>}
      </div>
    </div>
  )

  return clickable ? (
    <a
      className="card-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {CardInner}
    </a>
  ) : (
    CardInner
  )
}
