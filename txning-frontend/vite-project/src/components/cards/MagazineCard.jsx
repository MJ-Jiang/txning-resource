import { Link } from 'react-router-dom'
const STICKER_STYLE_BY_TYPE = {
  商务: {
    background: '#FFD64F',
  },
  杂志: {
    background: '#FFFFFF',
    color: '#111111',
  },
}

export default function MagazineCard({ item }) {
  const href = `/detail/${item.category}/${item.slug}`

  const stickerStyle =
    STICKER_STYLE_BY_TYPE[item.type] ?? STICKER_STYLE_BY_TYPE['商务']
  return (
    <Link to={href} className="card-link">
      <div className="mag-card">
        <div className="mag-img-container">
          <div className="mag-sticker" style={stickerStyle}>
            {item.title}
          </div>

          <img
            src={item.posterUrl ?? item.coverUrl}
            className="mag-img"
            alt={item.alt}
          />
        </div>
        <div className="mag-info">
          <p className="mag-title">{item.stickerText}</p>
        </div>
      </div>
    </Link>
  )
}
