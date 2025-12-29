// src/domain/type.js

export const TYPE_CODES = {
  FILM: 'film',
  TV_SERIES: 'tv_series',
  SHORT_SERIES: 'short_series',
  SHOW: 'show',
  STAGE_PLAY: 'stage_play',
  ENDORSEMENT: 'endorsement',
  MAGAZINE: 'magazine',
}

export const TYPE_LABEL = {
  [TYPE_CODES.FILM]: '电影',
  [TYPE_CODES.TV_SERIES]: '电视剧',
  [TYPE_CODES.SHORT_SERIES]: '短剧',
  [TYPE_CODES.SHOW]: '综艺',
  [TYPE_CODES.STAGE_PLAY]: '话剧',
  [TYPE_CODES.ENDORSEMENT]: '商务',
  [TYPE_CODES.MAGAZINE]: '杂志',
}
export const TYPE_STICKER_STYLE = {
  [TYPE_CODES.ENDORSEMENT]: {
    background: '#FFD64F',
  },
  [TYPE_CODES.MAGAZINE]: {
    background: '#FFFFFF',
    color: '#111111',
  },
}
