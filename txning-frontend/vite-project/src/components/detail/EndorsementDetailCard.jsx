import { useMemo } from 'react'
import { useDict } from '../../providers/useDict'

function IconImg({ src, alt, className }) {
  if (!src) return null
  return <img className={className} src={src} alt={alt} />
}

export default function EndorsementDetailCard(props) {
  // ✅ 兼容两种传参：detail / endorsement
  const endorsement = props?.endorsement ?? props?.detail


  const { typeNameById, statusNameById, bookingPlatformNameById } = useDict()

  // ✅ 兼容两种结构：
  // 1) ContentDetailOut: { content, booking_platforms, ... }
  // 2) 兜底：直接是 content 本体
  const content = endorsement?.content ?? endorsement
  const booking_platforms = endorsement?.booking_platforms ?? []

  const posterUrl = content?.cover_url ?? null
  const title = content?.title ?? ''
  const alt = title || 'poster'
  const typeId = content?.type_id ?? null
  const year = content?.release_year ?? null
  const statusId = content?.status_id ?? null
  const role = content?.role ?? null
  const description = content?.description ?? null

  const typeLabel =
    typeId != null ? (typeNameById?.[typeId] ?? String(typeId)) : ''
  const statusLabel =
    statusId != null ? (statusNameById?.[statusId] ?? String(statusId)) : ''

  // ✅ 仅显示有 url 的购票平台
  const buyableTickets = useMemo(() => {
    if (!Array.isArray(booking_platforms)) return []
    return booking_platforms.filter((t) => Boolean(t?.url))
  }, [booking_platforms])
  if (!endorsement) return null
  const showPurchase = buyableTickets.length > 0

  return (
    <div className="detail-card">
      <div className="detail-grid">
        {/* 封面 */}
        <div className="detail-cover">
          {posterUrl ? (
            <img className="detail-cover-img" src={posterUrl} alt={alt} />
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

            {/* 购买 */}
            {showPurchase ? (
              <div className="kv-row">
                <div className="kv-k">购买</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {buyableTickets.map((t) => {
                      const platform = t?.platform ?? {}
                      const label =
                        bookingPlatformNameById?.[platform.id] ??
                        platform.name_zh ??
                        (platform.id != null ? String(platform.id) : '平台')

                      return (
                        <a
                          key={`${platform.id ?? 'p'}-${t.url}`}
                          className="platform-link"
                          href={t.url}
                          target="_blank"
                          rel="noreferrer"
                          title={label}
                        >
                          <IconImg
                            className="platform-logo"
                            src="/icons/link.svg"
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
