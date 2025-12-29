import { useState } from 'react'
import { PLATFORM_LABEL } from '../../dictionary/ugcPlatform'

const ICON_CLASS_MAP = {
  picture: 'fa-heart',
  video: 'fa-play',
}

export default function GalleryCard({ item }) {
  if (!item) return null

  const icon = ICON_CLASS_MAP[item.ugcType] ?? 'fa-heart'

  const href = item.ugcUrl
  const clickable = Boolean(href)

  const platformCode = item.ugcPlatform
  const platformLabel = PLATFORM_LABEL?.[platformCode] ?? platformCode

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
        <img
          src={item.posterUrl}
          alt={item.posterAlt ?? item.title ?? 'Pic'}
          loading="lazy"
        />
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
