import { useMemo, useState } from 'react'

export default function GeneralCard({ item }) {
  if (!item) return null

  const href = item.linkUrl
  const clickable = Boolean(href)

  const cover = item.posterUrl
  const platform = item.platform
  const type = item.type
  const desc = item.desc ?? ''
  const alt = item.alt ?? item.title ?? desc ?? ''

  const [confirmOpen, setConfirmOpen] = useState(false)

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

  const onClickCard = (e) => {
    if (!clickable) return
    e.preventDefault()
    setConfirmOpen(true)
  }

  const onGo = () => {
    window.open(href, '_blank', 'noopener,noreferrer')
    setConfirmOpen(false)
  }

  return (
    <>
      <a
        className="card-link"
        href={href || undefined}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClickCard}
      >
        {CardInner}
      </a>

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
            {/* 右上角关闭按钮 */}
            <button
              className="ext-modal-close"
              type="button"
              aria-label="关闭"
              onClick={() => setConfirmOpen(false)}
            >
              ×
            </button>

            <div className="ext-modal-title" id="ext-modal-title">
              即将前往{platform ? `「${platform}」` : '第三方网站'}
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
