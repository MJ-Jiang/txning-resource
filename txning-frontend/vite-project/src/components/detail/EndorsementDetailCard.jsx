function toArray(v) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

function joinText(v, sep = ' / ') {
  return toArray(v).filter(Boolean).join(sep)
}

function getShopLinks(d) {
  if (!Array.isArray(d?.shopLinks)) return []
  return d.shopLinks
    .map((s) => ({ platform: s?.platform ?? '', url: s?.url ?? '' }))
    .filter((s) => s.platform && s.url)
}

const SHOP_ICON_MAP = {
  天猫: '/icons/tmall.svg',
  淘宝: '/icons/taobao.svg',
  京东: '/icons/jd.svg',
  小红书: '/icons/xhs.svg',
  抖音: '/icons/douyin.svg',
  微店: '/icons/wechat-shop.svg',
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

/**
 * 方案 B：只保留一份（status 英文 -> label 等元信息）
 * 数据中 status 推荐：active | expired | upcoming | soldout
 */
const ENDORSEMENT_STATUS_META = {
  active: { label: '代言中' },
  expired: { label: '已到期' },
  upcoming: { label: '待发售' },
  soldout: { label: '已售罄' },
}

// 购买显示规则：已到期/已售罄 不显示
function canShowPurchase(status) {
  return status !== 'expired' && status !== 'soldout'
}

export default function EndorsementDetailCard({ endorsement }) {
  if (!endorsement) return null

  const { posterUrl, title, alt, type, year, status, role, desc } = endorsement

  const shopLinks = getShopLinks(endorsement)
  const showPurchase = canShowPurchase(status)

  const statusLabel =
    ENDORSEMENT_STATUS_META[status]?.label ||
    (typeof status === 'string' ? status : '')
  const showTickets = ticketLinks.length > 0
  return (
    <div className="detail-card">
      <div className="detail-grid">
        {/* 封面 */}
        <div className="detail-cover">
          {posterUrl ? (
            <img
              className="detail-cover-img"
              src={posterUrl}
              alt={alt || title}
            />
          ) : (
            <div className="detail-cover-placeholder" />
          )}

          {role && <div className="detail-sticker">{role}</div>}
        </div>

        {/* 信息区 */}
        <div className="detail-info">
          <h1 className="detail-title">{title}</h1>

          <div className="detail-kv">
            {type && (
              <div className="kv-row">
                <div className="kv-k">分类</div>
                <div className="kv-v">{joinText(type)}</div>
              </div>
            )}

            {year && (
              <div className="kv-row">
                <div className="kv-k">年份</div>
                <div className="kv-v">{year}</div>
              </div>
            )}

            {statusLabel && (
              <div className="kv-row">
                <div className="kv-k">状态</div>
                <div className="kv-v">
                  {/* 你的 CSS 如果不区分状态，就只用一个 class */}
                  <span className="status-badge">{statusLabel}</span>
                </div>
              </div>
            )}

            {showPurchase && shopLinks.length > 0 && (
              <div className="kv-row">
                <div className="kv-k">购买</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {shopLinks.map((s) => {
                      const iconSrc = SHOP_ICON_MAP[s.platform]
                      const finalIcon = iconSrc || '/icons/link.svg'

                      return (
                        <a
                          key={`${s.platform}-${s.url}`}
                          className="platform-link"
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          title={s.platform}
                        >
                          <IconImg
                            className="platform-logo"
                            src={finalIcon}
                            alt={s.platform}
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
