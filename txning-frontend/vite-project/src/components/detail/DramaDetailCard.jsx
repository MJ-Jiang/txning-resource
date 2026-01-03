import { useMemo } from 'react'
import { useDict } from '../../providers/useDict'

function IconImg({ src, alt, className }) {
  if (!src) return null
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}

export default function DramaDetailCard({ detail }) {
  

  const { genreNameById, platformNameById, bookingPlatformNameById } = useDict()

  const { content, rating, genres, platforms, booking_platforms } = detail

  const title = content?.title ?? ''
  const coverUrl = content?.cover_url ?? ''
  const year = content?.release_year
  const episodes = content?.episode_count
  const description = content?.description ?? ''
  const statusId = content?.status_id ?? null

  const ratingValue = rating?.value
  const ratingUrl = rating?.url

  // ✅ genres 必须用 genreNameById
  const genreText = useMemo(() => {
    const gs = Array.isArray(genres) ? genres : []
    return gs
      .map((g) => genreNameById?.[g?.id])
      .filter(Boolean)
      .join(' / ')
  }, [genres, genreNameById])

  // ✅ 播放平台：用 detail.platforms（只要 platform.id 存在就显示，url 可空）
  const playPlatforms = useMemo(() => {
    const ps = Array.isArray(platforms) ? platforms : []
    return ps
      .map((p) => ({
        id: p?.platform?.id ?? null,
        code: p?.platform?.code ?? null,
        name_zh: p?.platform?.name_zh ?? null,
        url: p?.url ?? null,
      }))
      .filter((x) => x.id != null)
  }, [platforms])

  // ✅ 购票：status !== 4 且 booking platform id 存在就显示（url 可空）
  const buyPlatforms = useMemo(() => {
    const bs = Array.isArray(booking_platforms) ? booking_platforms : []
    return bs
      .map((t) => ({
        id: t?.platform?.id ?? null,
        code: t?.platform?.code ?? null,
        name_zh: t?.platform?.name_zh ?? null,
        url: t?.url ?? null,
      }))
      .filter((x) => x.id != null)
  }, [booking_platforms])
 if (!detail) return null
  const showPlay = playPlatforms.length > 0
  const showBuy = statusId !== 4 && buyPlatforms.length > 0

  return (
    <div className="detail-card">
      <div className="detail-grid">
        <div className="detail-cover">
          <img className="detail-cover-img" src={coverUrl} alt={title} />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{title}</h1>

          <div className="detail-kv">
            {genreText ? (
              <div className="kv-row">
                <div className="kv-k">类型</div>
                <div className="kv-v">{genreText}</div>
              </div>
            ) : null}

            {year ? (
              <div className="kv-row">
                <div className="kv-k">年份</div>
                <div className="kv-v">{year}</div>
              </div>
            ) : null}

            {episodes ? (
              <div className="kv-row">
                <div className="kv-k">集数</div>
                <div className="kv-v">{episodes}</div>
              </div>
            ) : null}

            {ratingValue || ratingUrl ? (
              <div className="kv-row">
                <div className="kv-k kv-k--icon">
                  <a
                    className="kv-ico-link"
                    href={ratingUrl || undefined}
                    target="_blank"
                    rel="noreferrer"
                    title="豆瓣"
                    onClick={(e) => {
                      if (!ratingUrl) e.preventDefault()
                    }}
                  >
                    <IconImg
                      className="kv-ico"
                      src="/icons/douban.svg"
                      alt="豆瓣"
                    />
                  </a>
                </div>
                <div className="kv-v">{ratingValue}</div>
              </div>
            ) : null}

            {showPlay ? (
              <div className="kv-row">
                <div className="kv-k">播放</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {playPlatforms.map((p) => {
                      const label =
                        platformNameById?.[p.id] ??
                        p.name_zh ??
                        p.code ??
                        String(p.id)
                      const iconSrc = p.code ? `/icons/${p.code}.svg` : null

                      const inner = (
                        <IconImg
                          className="platform-logo"
                          src={iconSrc}
                          alt={label}
                        />
                      )

                      if (p.url) {
                        return (
                          <a
                            key={`${p.id}-${p.url}`}
                            className="platform-link"
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            title={label}
                          >
                            {inner}
                          </a>
                        )
                      }

                      return (
                        <span
                          key={p.id}
                          className="platform-link"
                          title={label}
                        >
                          {inner}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {showBuy ? (
              <div className="kv-row">
                <div className="kv-k">购买</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {buyPlatforms.map((b) => {
                      const label =
                        bookingPlatformNameById?.[b.id] ??
                        b.name_zh ??
                        b.code ??
                        String(b.id)
                      const iconSrc = b.code ? `/icons/${b.code}.svg` : null

                      const inner = (
                        <IconImg
                          className="platform-logo"
                          src={iconSrc}
                          alt={label}
                        />
                      )

                      if (b.url) {
                        return (
                          <a
                            key={`${b.id}-${b.url}`}
                            className="platform-link"
                            href={b.url}
                            target="_blank"
                            rel="noreferrer"
                            title={label}
                          >
                            {inner}
                          </a>
                        )
                      }

                      return (
                        <span
                          key={b.id}
                          className="platform-link"
                          title={label}
                        >
                          {inner}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {description ? (
        <div className="detail-desc">
          <div className="detail-desc-hd">简介</div>
          <p className="detail-desc-text">{description}</p>
        </div>
      ) : null}
    </div>
  )
}
