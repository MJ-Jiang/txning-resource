import { Link } from 'react-router-dom'
import { getTypeStickerStyle } from '@/dictionary/type'
import { useDict } from '@/providers/useDict'

export default function EndorsementCard({ item }) {
  const { categoryById } = useDict()

  const categoryCode = categoryById?.[item.category_id]?.code
  if (!categoryCode) {
    return null
  }

  const href = `/detail/${categoryCode}/${item.id}`

  const stickerStyle = getTypeStickerStyle(item.type_id)

  return (
    <Link to={href} className="card-link">
      <div className="mag-card">
        <div className="mag-img-container">
          <div className="mag-sticker" style={stickerStyle}>
            {item.title}
          </div>

          <img
            src={item.cover_url}
            className="mag-img"
            alt={item.title || item.role || 'poster'}
            loading="lazy"
          />
        </div>

        <div className="mag-info">
          <p className="mag-title">{item.role}</p>
        </div>
      </div>
    </Link>
  )
}
