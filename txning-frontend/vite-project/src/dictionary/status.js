// src/domain/status.js

import { PLATFORM_LABEL } from './platform'

// 领域层：只放“状态语义”和“展示文案”，不处理 raw 数据
export const STATUS_STYLE = {
  not_yet_released: { background: '#888' },
  upcoming: { background: '#2F6BFF' },
  now_showing: { background: '#E53935' },
  ended: { background: '#f3641b' },
  planned: { background: '#2F6BFF' },
  ongoing: { background: '#E53935' },
  finished: { background: '#f3641b' },
}

export const STATUS_CODES = {
  NOT_YET_RELEASED: 'not_yet_released',
  UPCOMING: 'upcoming',
  NOW_SHOWING: 'now_showing',
  ENDED: 'ended',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  TO_BE_RELEASED: 'to_be_released',
  SOLDOUT: 'soldout',
  PLANNED: 'planned',
  ONGOING: 'ongoing',
  FINISHED: 'finished',
}

// 卡片/Tag 展示：细粒度（会受 type 影响）
export const STATUS_DISPLAY_LABEL = {
  [STATUS_CODES.NOT_YET_RELEASED]: {
    film: '待映',
    tv_series: '待播',
    short_series: '待播',
    show: '待播',
    stage_play: '待映',
  },
  [STATUS_CODES.UPCOMING]: {
    film: '即将上映',
    tv_series: '即将上线',
    short_series: '即将上线',
    show: '即将上线',
    stage_play: '即将上映',
  },
  [STATUS_CODES.NOW_SHOWING]: {
    film: '热映中',
    tv_series: '热播中',
    short_series: '热播中',
    show: '热播中',
    stage_play: '演出中',
  },
  [STATUS_CODES.ENDED]: {
    film: '网络上线',
    tv_series: '已完结',
    short_series: '已完结',
    show: '已完结',
    stage_play: '已完结',
  },
}

// 筛选下拉展示：粗粒度（不区分播/映）
export const STATUS_FILTER_LABEL = {
  [STATUS_CODES.NOT_YET_RELEASED]: '待播/待映',
  [STATUS_CODES.UPCOMING]: '即将上线/上映',
  [STATUS_CODES.NOW_SHOWING]: '热播中/热映中',
  [STATUS_CODES.ENDED]: '完结/上线',
  [STATUS_CODES.ACTIVE]: '代言中',
  [STATUS_CODES.EXPIRED]: '已到期',
  [STATUS_CODES.TO_BE_RELEASED]: '待发售',
  [STATUS_CODES.SOLDOUT]: '已售罄',
  [STATUS_CODES.PLANNED]: '已官宣',
  [STATUS_CODES.ONGOING]: '开展中',
  [STATUS_CODES.FINISHED]: '已结束',
}

// 统一函数：给定 (statusCode, typeCode) 得到卡片展示文案
export function getStatusDisplayLabel(statusCode, typeCode) {
  return STATUS_DISPLAY_LABEL?.[statusCode]?.[typeCode] ?? ''
}
export function canShowPurchase(status) {
  return (
    status === STATUS_CODES.ACTIVE || status === STATUS_CODES.TO_BE_RELEASED
  )
}
