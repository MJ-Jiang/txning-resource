import { useState, useMemo } from 'react'
import { useDict } from '../../providers/useDict'

const ICON_CLASS_MAP = {
  picture: 'fa-heart',
  video: 'fa-play',
}

export default function GalleryCard({ item }) {
  if (!item) return null

  const { ugcPlatformNameById } = useDict()

  const icon = ICON_CLASS_MAP[item.ugc_type] ?? 'fa-heart'

  // ✅ 统一外链字段：优先用后端 card 的 link_url，其次才兜底 ugc_url
  const href = item.link_url ?? item.ugc_url ?? null
  const clickable = Boolean(href)

  // ✅ 平台名：优先用 ugc_platform_id（你字典里就是这个），没有就不显示平台
  const platformId = item.ugc_platform_id
  const platformLabel = useMemo(() => {
    if (!platformId) return ''
    return ugcPlatformNameById?.[platformId] ?? String(platformId)
  }, [ugcPlatformNameById, platformId])

  const [confirmOpen, setConfirmOpen] = useState(false)

  const onCardClick = () => {
    if (!clickable) return
    setConfirmOpen(true)
  }

  const onGo = () => {
    if (!href) return
    window.open(href, '_blank', 'noopener,noreferrer')
    setConfirmOpen(false)
  }

  return (
    <>
      <div
        className="gallery-item"
        data-role="external-card"
        onClick={onCardClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={(e) => {
          if (!clickable) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setConfirmOpen(true)
          }
        }}
      >
        <img src={item.cover_url} alt={item.title ?? 'Pic'} loading="lazy" />
        <div className="gallery-overlay">
          <i className={`fa-solid ${icon}`} style={{ fontSize: '2rem' }}></i>
        </div>
      </div>

      {confirmOpen && (
        <div
          className="ext-modal-overlay"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            className="ext-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ext-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="ext-modal-close"
              type="button"
              aria-label="关闭"
              onClick={() => setConfirmOpen(false)}
            >
              ×
            </button>

            <div className="ext-modal-title" id="ext-modal-title">
              即将前往{platformLabel ? `「${platformLabel}」` : '第三方网站'}
            </div>

            <div className="ext-modal-body">
              <div className="ext-modal-desc">你即将打开以下链接：</div>
              <div className="ext-modal-url">{href}</div>
            </div>

            <div className="ext-modal-actions">
              <button
                className="ext-btn ext-btn-ghost"
                type="button"
                onClick={() => setConfirmOpen(false)}
              >
                暂不
              </button>
              <button
                className="ext-btn ext-btn-primary"
                type="button"
                onClick={onGo}
                disabled={!href}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
