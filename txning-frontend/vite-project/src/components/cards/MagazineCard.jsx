export default function MagazineCard({ item }) {
  return (
    <div className="mag-card">
      <div className="mag-img-container">
        <div className="mag-sticker" style={item.stickerStyle}>
          {item.stickerText}
        </div>

        <img src={item.coverUrl} className="mag-img" alt={item.alt} />
      </div>

      <div className="mag-info">
        <h3 className="mag-title">{item.title}</h3>
        <p className="mag-sub">{item.subTitle}</p>
      </div>
    </div>
  )
}
// 3:4 或 4:5比例图片
