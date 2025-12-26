function toArray(v) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

function joinText(v, sep = ' / ') {
  return toArray(v).filter(Boolean).join(sep)
}

function getPlatforms(d) {
  if (!Array.isArray(d?.platforms)) return []
  return d.platforms
    .map((p) => ({ key: p?.key ?? '', url: p?.url ?? '' }))
    .filter((p) => p.key && p.url)
}

/** 平台白名单：只认这些 */
const PLATFORM_ICON_MAP = {
  腾讯视频: '/icons/tc.svg',
  bilibili: '/icons/bilibili.svg',
  YouTube: '/icons/youtube.svg',
  爱奇艺: '/icons/iqiyi.svg',
  芒果TV: '/icons/mgtv.svg',
  优酷视频: '/icons/youku.svg',
}

function IconImg({ src, alt, className }) {
  if (!src) return null
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => {
        console.error('Icon load failed:', src)
      }}
    />
  )
}

export default function DramaDetailCard({ drama }) {
  if (!drama) return null

  const {
    posterUrl,
    title,
    type,
    genres,
    year,
    episodes,
    rated,
    ratedLink,
    desc,
  } = drama

  const platforms = getPlatforms(drama)

  return (
    <section className="page-container">
      <div className="detail-card">
        <div className="detail-grid">
          {/* 封面 */}
          <div className="detail-cover">
            {posterUrl ? (
              <img className="detail-cover-img" src={posterUrl} alt={title} />
            ) : (
              <div className="detail-cover-placeholder" />
            )}
          </div>

          {/* 信息区 */}
          <div className="detail-info">
            <h1 className="detail-title">{title}</h1>

            <div className="detail-kv">
              {type?.length > 0 && (
                <div className="kv-row">
                  <div className="kv-k">分类</div>
                  <div className="kv-v">{joinText(type)}</div>
                </div>
              )}

              {genres?.length > 0 && (
                <div className="kv-row">
                  <div className="kv-k">类型</div>
                  <div className="kv-v">{joinText(genres)}</div>
                </div>
              )}

              {year && (
                <div className="kv-row">
                  <div className="kv-k">年份</div>
                  <div className="kv-v">{year}</div>
                </div>
              )}

              {episodes && (
                <div className="kv-row">
                  <div className="kv-k">集数</div>
                  <div className="kv-v">{episodes}</div>
                </div>
              )}

              {(rated || ratedLink) && (
                <div className="kv-row">
                  <div className="kv-k kv-k--icon">
                    <a
                      className="kv-ico-link"
                      href={ratedLink || '#'}
                      target={ratedLink ? '_blank' : undefined}
                      rel={ratedLink ? 'noreferrer' : undefined}
                      onClick={(e) => {
                        if (!ratedLink) e.preventDefault()
                      }}
                      title="豆瓣"
                    >
                      <IconImg
                        className="kv-ico"
                        src="/icons/db.svg"
                        alt="豆瓣"
                      />
                    </a>
                  </div>
                  <div className="kv-v">{rated}</div>
                </div>
              )}

              {/* 播放：只显示平台 logo，无文字废话 */}
              {platforms.length > 0 && (
                <div className="kv-row">
                  <div className="kv-k">播放</div>
                  <div className="kv-v">
                    <div className="platform-row">
                      {platforms.map((p) => {
                        const iconSrc = PLATFORM_ICON_MAP[p.key]
                        if (!iconSrc) return null

                        return (
                          <a
                            key={p.key}
                            className="platform-link"
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            title={p.key}
                          >
                            <IconImg
                              className="platform-logo"
                              src={iconSrc}
                              alt={p.key}
                            />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 简介 */}
        {desc && (
          <div className="detail-desc">
            <div className="detail-desc-hd">简介</div>
            <p className="detail-desc-text">{desc}</p>
          </div>
        )}
      </div>
    </section>
  )
}
