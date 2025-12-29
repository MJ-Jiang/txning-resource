import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function isHttpUrl(v) {
  return typeof v === 'string' && /^https?:\/\//i.test(v)
}

export default function GeneralCard({ item }) {
  if (!item) return null

  const cover = item.posterUrl
  const platform = item.platform
  const mediaType = item.mediaType
  const desc = item.desc ?? ''
  const alt = item.alt ?? item.title ?? desc ?? ''

  // 站内详情页（按你项目约定）
  const internalHref = useMemo(() => {
    if (!item.category || !item.id) return ''
    return `/detail/${item.category}/${item.id}`
  }, [item.category, item.id])

  // 外链（如有）
  const externalHref = item.linkUrl || ''

  const isExternal = isHttpUrl(externalHref)
  const isInternal = !isExternal && Boolean(internalHref)

  // 是否可点击：外链 or 站内链接任意一个成立
  const clickable = isExternal || isInternal

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
        {mediaType && <div className="general-type">{mediaType}</div>}
      </div>
    </div>
  )

  // 外链：拦截点击 -> 弹确认
  const onClickExternal = (e) => {
    if (!isExternal) return
    e.preventDefault()
    setConfirmOpen(true)
  }

  const onGoExternal = () => {
    window.open(externalHref, '_blank', 'noopener,noreferrer')
    setConfirmOpen(false)
  }

  // 1) 站内：直接 Link 跳转
  if (isInternal) {
    return (
      <Link to={internalHref} className="card-link">
        {CardInner}
      </Link>
    )
  }

  // 2) 外链：弹窗确认后再打开
  if (isExternal) {
    return (
      <>
        <a
          className="card-link"
          data-role="external-card"
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClickExternal}
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
                <div className="ext-modal-url">{externalHref}</div>
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
                  onClick={onGoExternal}
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

  // 3) 都没有：不可点击
  return <div className="card-link">{CardInner}</div>
}
