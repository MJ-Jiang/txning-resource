// src/domain/type.js

export const TYPE_CODES = {
  FILM: 'film',
  TV_SERIES: 'tv_series',
  SHORT_SERIES: 'short_series',
  SHOW: 'show',
  STAGE_PLAY: 'stage_play',
}

export const TYPE_LABEL = {
  [TYPE_CODES.FILM]: '电影',
  [TYPE_CODES.TV_SERIES]: '电视剧',
  [TYPE_CODES.SHORT_SERIES]: '短剧',
  [TYPE_CODES.SHOW]: '综艺',
  [TYPE_CODES.STAGE_PLAY]: '话剧',
}
