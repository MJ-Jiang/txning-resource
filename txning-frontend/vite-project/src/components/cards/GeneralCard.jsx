import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PLATFORM_LABEL } from '../../dictionary/ugcPlatform' // 路径按项目实际

function isHttpUrl(v) {
  return typeof v === 'string' && /^https?:\/\//i.test(v)
}

export default function GeneralCard({ item }) {
  if (!item) return null

  const cover = item.posterUrl

  // ✅ 全量字段替换
  const ugcType = item.ugcType // 'video' | 'picture'
  const ugcUrl = item.ugcUrl || '' // 外链
  const ugcPlatform = item.ugcPlatform // 平台 code
  const platformLabel = PLATFORM_LABEL?.[ugcPlatform] ?? ugcPlatform

  const desc = item.description ?? ''
  const alt = item.posterAlt ?? item.title ?? desc ?? ''
  const UGC_TYPE_LABEL = {
    video: '视频',
    picture: '图片',
  }
  // 站内详情页
  const internalHref = useMemo(() => {
    if (!item.category || !item.id) return ''
    return `/detail/${item.category}/${item.id}`
  }, [item.category, item.id])

  const isExternal = isHttpUrl(ugcUrl)
  const isInternal = !isExternal && Boolean(internalHref)

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

        {/* ✅ 平台角标 */}
        {ugcPlatform && <div className="general-badge">{platformLabel}</div>}

        {/* ✅ 媒体类型角标 */}
        {ugcType && (
          <div className="general-type">
            {UGC_TYPE_LABEL[ugcType] ?? ugcType}
          </div>
        )}
      </div>
    </div>
  )

  // 外链点击：弹确认
  const onClickExternal = (e) => {
    if (!isExternal) return
    e.preventDefault()
    setConfirmOpen(true)
  }

  const onGoExternal = () => {
    if (!ugcUrl) return
    window.open(ugcUrl, '_blank', 'noopener,noreferrer')
    setConfirmOpen(false)
  }

  // 1️⃣ 站内跳转
  if (isInternal) {
    return (
      <Link to={internalHref} className="card-link">
        {CardInner}
      </Link>
    )
  }

  // 2️⃣ 外链（确认弹窗）
  if (isExternal) {
    return (
      <>
        <a
          className="card-link"
          data-role="external-card"
          href={ugcUrl}
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
                即将前往
                {platformLabel ? `「${platformLabel}」` : '第三方网站'}
              </div>

              <div className="ext-modal-body">
                <div className="ext-modal-desc">你即将打开以下链接：</div>
                <div className="ext-modal-url">{ugcUrl}</div>
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

  // 3️⃣ 不可点击
  return <div className="card-link">{CardInner}</div>
}
