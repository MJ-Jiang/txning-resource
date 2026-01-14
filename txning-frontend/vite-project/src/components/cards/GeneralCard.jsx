import { useState } from 'react'
import { useDict } from '../../providers/useDict'

function isHttpUrl(v) {
  return typeof v === 'string' && /^https?:\/\//i.test(v)
}

const UGC_TYPE_LABEL = {
  picture: '图片',
  video: '视频',
}

export default function GeneralCard({ item }) {
  const { ugcPlatformNameById, categoryById } = useDict()
  const [confirmOpen, setConfirmOpen] = useState(false)
  if (!item) return null

  // ✅ 兼容 ContentCardOut / ContentDetailOut
  const content = item.content ?? item

  const id = content.id ?? item.id
  const categoryId = content.category_id ?? item.category_id

  const cover = content.cover_url ?? null
  const title = content.title ?? ''
  const desc = content.description ?? ''
  const alt = title || desc || ''

  // 外链
  const externalUrl = content.link_url ?? item.link_url ?? ''

  const isExternal = isHttpUrl(externalUrl)

  // ✅ 内链：/detail/${categoryCode}/${id}
  const categoryCode =
    categoryId != null ? categoryById?.[categoryId]?.code : null
  const internalHref =
    !isExternal && categoryCode && id ? `/detail/${categoryCode}/${id}` : null

  // 右上：平台（✅ 本站也显示）
  const platformId = content.ugc_platform_id
  const platformLabel =
    platformId == null
      ? '本站'
      : (ugcPlatformNameById?.[platformId] ?? String(platformId))

  const badgeText = platformLabel || null

  // 左下：图片/视频（只在有 ugc_type 时显示）
  const ugcType = content.ugc_type
  const typeText = ugcType ? (UGC_TYPE_LABEL[ugcType] ?? String(ugcType)) : null

  const onGoExternal = () => {
    if (!externalUrl) return
    window.open(externalUrl, '_blank', 'noopener,noreferrer')
    setConfirmOpen(false)
  }

  const CardInner = (
    <div className="general-card is-clickable">
      <div className="general-media" style={{ position: 'relative' }}>
        {cover ? (
          <img className="general-thumb" src={cover} alt={alt} loading="lazy" />
        ) : (
          <div className="general-thumb general-thumb--placeholder" />
        )}

        {badgeText ? <div className="general-badge">{badgeText}</div> : null}
        {typeText ? <div className="general-type">{typeText}</div> : null}
      </div>
    </div>
  )

  // =====================================================
  // 外链（✅ 修复：不再使用 <a target=_blank>）
  // =====================================================
  if (isExternal) {
    return (
      <>
        <div
          className="card-link"
          data-role="external-card"
          role="button"
          tabIndex={0}
          onClick={() => setConfirmOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setConfirmOpen(true)
            }
          }}
        >
          {CardInner}
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
                即将前往「{platformLabel}」
              </div>

              <div className="ext-modal-body">
                <div className="ext-modal-desc">你即将打开以下链接：</div>
                <div className="ext-modal-url">{externalUrl}</div>
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
                  disabled={!externalUrl}
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

  // =====================================================
  // 内链（保持不变）
  // =====================================================
  if (internalHref) {
    return (
      <a className="card-link" href={internalHref}>
        {CardInner}
      </a>
    )
  }

  return <div className="card-link">{CardInner}</div>
}
