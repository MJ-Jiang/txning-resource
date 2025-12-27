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

const PLATFORM_ICON_MAP = {
  腾讯视频: '/icons/tc.svg',
  Bilibili: '/icons/bilibili.svg',
  YouTube: '/icons/youtube.svg',
  爱奇艺: '/icons/iqiyi.svg',
  芒果TV: '/icons/mgtv.svg',
  优酷视频: '/icons/youku.svg',
}
const TICKET_ICON_MAP = {
  大麦: '/icons/damai.svg',
  猫眼: '/icons/maoyan.svg',
  票星球: '/icons/piaoxingqiu.svg',
  纷玩岛: '/icons/fenwandao.svg',
  秀动: '/icons/xiudong.svg',
  抖音: '/icons/douyin.svg',
  小红书: '/icons/xhs.svg',
  官方: '/icons/link.svg',
}
function getTicketLinks(d) {
  if (!Array.isArray(d?.ticketLinks)) return []
  return d.ticketLinks
    .map((t) => ({ platform: t?.platform ?? '', url: t?.url ?? '' }))
    .filter((t) => t.platform && t.url)
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
  const ticketLinks = getTicketLinks(drama)
  const platforms = getPlatforms(drama)
  const showTickets = ticketLinks.length > 0
  return (
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
            {showTickets && (
              <div className="kv-row">
                <div className="kv-k">购票</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {ticketLinks.map((t) => {
                      const iconSrc = TICKET_ICON_MAP[t.platform]
                      const finalIcon = iconSrc || '/icons/link.svg'

                      return (
                        <a
                          key={`${t.platform}-${t.url}`}
                          className="platform-link"
                          href={t.url}
                          target="_blank"
                          rel="noreferrer"
                          title={t.platform}
                        >
                          <IconImg
                            className="platform-logo"
                            src={finalIcon}
                            alt={t.platform}
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
  )
}
