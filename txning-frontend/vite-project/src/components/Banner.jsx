import { useEffect, useState } from 'react'

export default function Banner({
  banners = [], // [{ imgSrc, href, alt }]
  autoPlay = true,
  interval = 4500,
}) {
  const validBanners = banners.filter((b) => b?.imgSrc)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || validBanners.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % validBanners.length)
    }, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, validBanners.length])

  if (validBanners.length === 0) return null

  return (
    <section className="hero-wrap">
      <div
        className="hero-track"
        style={{ transform: `translateX(${-index * 100}%)` }}
      >
        {validBanners.map((b, i) => (
          <a
            key={i}
            className="hero"
            href={b.href || '#'}
            aria-label={b.alt || `Banner ${i + 1}`}
          >
            <img className="hero__img" src={b.imgSrc} alt={b.alt || ''} />
          </a>
        ))}
      </div>

      {validBanners.length > 1 && (
        <div className="hero-dots">
          {validBanners.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to banner ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
/*desktop: 1920 × 720 px  phone: 1080 × 1350 px*/
