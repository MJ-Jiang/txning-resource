function pickCover(item) {
  return item?.coverUrl ?? item?.cover ?? item?.poster ?? item?.image ?? ''
}

function getDramaPlatform(d) {
  if (d?.platform) return d.platform
  if (Array.isArray(d?.platforms) && d.platforms.length) return d.platforms[0]
  return ''
}

function getDramaGenres(d) {
  if (Array.isArray(d?.genres)) return d.genres
  if (d?.genre) return [d.genre]
  return []
}

/**
 * 影视详情大卡片
 * 只负责展示 drama 信息，不处理路由、不处理 UGC、不处理筛选
 */
export default function DramaDetailCard({ drama }) {
  if (!drama) return null

  const cover = pickCover(drama)
  const platform = getDramaPlatform(drama)
  const genres = getDramaGenres(drama)
  const desc = drama?.desc ?? drama?.description ?? drama?.summary ?? ''

  return (
    <div className="detail-card">
      <div className="detail-top">
        {/* 封面 */}
        <div className="detail-cover">
          {cover ? (
            <img className="detail-cover-img" src={cover} alt={drama.title} />
          ) : (
            <div className="detail-cover-placeholder" />
          )}
        </div>

        {/* 信息区 */}
        <div className="detail-info">
          <h2 className="detail-title">{drama.title}</h2>

          <div className="detail-meta">
            {drama.year && <span className="meta-chip">{drama.year}</span>}
            {platform && <span className="meta-chip">{platform}</span>}
            {drama.status && <span className="meta-chip">{drama.status}</span>}
          </div>

          {genres.length > 0 && (
            <div className="detail-tags">
              {genres.map((g) => (
                <span key={g} className="tag-chip">
                  {g}
                </span>
              ))}
            </div>
          )}

          {desc && (
            <div className="detail-desc-wrap">
              <h3 className="detail-subtitle">简介</h3>
              <p className="detail-desc">{desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
