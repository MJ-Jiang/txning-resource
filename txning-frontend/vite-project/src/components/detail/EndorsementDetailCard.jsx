import { TYPE_LABEL } from '../../dictionary/type'
import { STATUS_FILTER_LABEL, canShowPurchase } from '../../dictionary/status'
import {
  BOOKING_PLATFORM_LABEL,
  BOOKING_PLATFORM_ICON,
} from '../../dictionary/bookingPlatform'

function getBookingLinks(d) {
  if (!Array.isArray(d?.bookingPlatform)) return []
  return d.bookingPlatform
    .map((x) => ({
      code: x?.code ?? '',
      url: x?.url ?? null,
    }))
    .filter((x) => x.code)
}

function IconImg({ src, alt, className }) {
  if (!src) return null
  return <img className={className} src={src} alt={alt} />
}

export default function EndorsementDetailCard({ endorsement }) {
  if (!endorsement) return null

  const { posterUrl, title, alt, type, year, status, role, description } =
    endorsement

  const bookingLinks = getBookingLinks(endorsement)
  const buyableLinks = bookingLinks.filter((x) => Boolean(x.url))
  const showPurchase = canShowPurchase(status) && buyableLinks.length > 0

  const typeLabel = TYPE_LABEL[type] ?? type
  const statusLabel = STATUS_FILTER_LABEL[status] ?? status

  return (
    <div className="detail-card">
      <div className="detail-grid">
        {/* 封面 */}
        <div className="detail-cover">
          {posterUrl ? (
            <img
              className="detail-cover-img"
              src={posterUrl}
              alt={alt || title}
            />
          ) : (
            <div className="detail-cover-placeholder" />
          )}

          {role ? <div className="detail-sticker">{role}</div> : null}
        </div>

        {/* 信息区 */}
        <div className="detail-info">
          <h1 className="detail-title">{title}</h1>

          <div className="detail-kv">
            {typeLabel ? (
              <div className="kv-row">
                <div className="kv-k">分类</div>
                <div className="kv-v">{typeLabel}</div>
              </div>
            ) : null}

            {year ? (
              <div className="kv-row">
                <div className="kv-k">年份</div>
                <div className="kv-v">{year}</div>
              </div>
            ) : null}

            {statusLabel ? (
              <div className="kv-row">
                <div className="kv-k">状态</div>
                <div className="kv-v">
                  <span className="status-badge">{statusLabel}</span>
                </div>
              </div>
            ) : null}

            {/* 购买：仅当状态允许 + 有 url 才显示 */}
            {showPurchase ? (
              <div className="kv-row">
                <div className="kv-k">购买</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {buyableLinks.map((x) => {
                      const label = BOOKING_PLATFORM_LABEL[x.code] ?? x.code
                      const icon =
                        BOOKING_PLATFORM_ICON[x.code] ?? '/icons/link.svg'

                      return (
                        <a
                          key={`${x.code}-${x.url}`}
                          className="platform-link"
                          href={x.url}
                          target="_blank"
                          rel="noreferrer"
                          title={label}
                        >
                          <IconImg
                            className="platform-logo"
                            src={icon}
                            alt={label}
                          />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 简介 */}
      {description ? (
        <div className="detail-desc">
          <div className="detail-desc-hd">简介</div>
          <p className="detail-desc-text">{description}</p>
        </div>
      ) : null}
    </div>
  )
}
