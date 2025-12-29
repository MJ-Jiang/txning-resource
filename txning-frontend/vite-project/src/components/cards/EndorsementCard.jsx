import { Link } from 'react-router-dom'
import { TYPE_STICKER_STYLE, TYPE_LABEL } from '@/dictionary/type'

export default function EndorsementCard({ item }) {
  const href = `/detail/${item.category}/${item.id}`

  const stickerStyle = TYPE_STICKER_STYLE[item.type]

  return (
    <Link to={href} className="card-link">
      <div className="mag-card">
        <div className="mag-img-container">
          <div className="mag-sticker" style={stickerStyle}>
            {item.title}
          </div>

          <img src={item.posterUrl} className="mag-img" alt={item.alt} />
        </div>
        <div className="mag-info">
          <p className="mag-title">{item.role}</p>
        </div>
      </div>
    </Link>
  )
}
