const ICON_CLASS_MAP = {
  image: 'fa-heart',
  video: 'fa-play',
  album: 'fa-expand',
}

export default function GalleryCard({ item }) {
  const icon = ICON_CLASS_MAP[item.mediaType] ?? 'fa-heart'

  return (
    <div className="gallery-item">
      <img src={item.thumbUrl} alt={item.alt ?? 'Pic'} />
      <div className="gallery-overlay">
        <i className={`fa-solid ${icon}`} style={{ fontSize: '2rem' }}></i>
      </div>
    </div>
  )
}
