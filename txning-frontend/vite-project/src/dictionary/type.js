export const TYPE_STICKER_STYLE = {
  6: { background: '#FFD64F' }, // 商务
  7: { background: '#FFFFFF', color: '#111111' }, // 杂志
}
export const TYPE_LABEL = {} //临时，后面删
// 兜底样式，避免 undefined
export const DEFAULT_TYPE_STICKER_STYLE = {
  background: '#FFFFFF',
  color: '#111111',
}

export function getTypeStickerStyle(typeId) {
  return TYPE_STICKER_STYLE[typeId] || DEFAULT_TYPE_STICKER_STYLE
}
