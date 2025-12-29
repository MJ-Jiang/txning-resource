import { useEffect, useMemo, useState } from 'react'
import { PLATFORM_LABEL } from '@/dictionary/platform'

function isExternalHref(href) {
  if (!href) return false
  if (href.startsWith('/') || href.startsWith('#')) return false
  return /^https?:\/\//i.test(href)
}

function isInternalByPlatforms(platforms) {
  return (
    Array.isArray(platforms) && platforms.some((p) => p?.code === 'this_web')
  )
}

function getPlatformText(platforms) {
  if (!Array.isArray(platforms) || platforms.length === 0) return ''
  const labels = platforms
    .map((p) => PLATFORM_LABEL[p?.code] ?? p?.code)
    .filter(Boolean)
  return labels.join(' / ')
}

export default function Banner({
  banners = [],
  autoPlay = true,
  interval = 4500,
}) {
  const validBanners = useMemo(
    () => (Array.isArray(banners) ? banners : []).filter((b) => !!b?.posterUrl),
    [banners]
  )

  const [index, setIndex] = useState(0)

  // 外链确认弹窗
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [externalHref, setExternalHref] = useState('')
  const [platformText, setPlatformText] = useState('')

  // autoplay
  useEffect(() => {
    if (!autoPlay || validBanners.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % validBanners.length)
    }, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, validBanners.length])

  // 防止越界
  useEffect(() => {
    if (index >= validBanners.length) setIndex(0)
  }, [index, validBanners.length])

  if (validBanners.length === 0) return null

  function openExternalConfirm(href, platforms) {
    setExternalHref(href)
    setPlatformText(getPlatformText(platforms))
    setConfirmOpen(true)
  }

  function onGoExternal() {
    const href = externalHref
    setConfirmOpen(false)
    if (!href) return
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <section className="hero-wrap">
        <div
          className="hero-track"
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {validBanners.map((b, i) => {
            const href = b.href || '#'

            // ✅ 新规则：只要标记了 this_web 就当站内
            const internal = isInternalByPlatforms(b.platforms)

            // ✅ 外链判定：站外 + href 是 http(s)
            const external = !internal && isExternalHref(href)

            return (
              <a
                key={b.id ?? i}
                className="hero"
                href={href}
                data-role="banner"
                aria-label={b.posterAlt || `首页Banner`}
                onClick={(e) => {
                  if (!external) return
                  e.preventDefault()
                  openExternalConfirm(href, b.platforms)
                }}
              >
                <img
                  className="hero__img"
                  src={b.posterUrl}
                  alt={b.posterAlt || ''}
                />
              </a>
            )
          })}
        </div>

        {validBanners.length > 1 && (
          <div className="hero-dots">
            {validBanners.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to banner ${i + 1}`}
                type="button"
              />
            ))}
          </div>
        )}
      </section>

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
              即将前往{platformText ? `「${platformText}」` : '第三方网站'}
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
