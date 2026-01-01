// src/domain/status.js

import { PLATFORM_LABEL } from './platform'

// 领域层：只放“状态语义”和“展示文案”，不处理 raw 数据
export const STATUS_STYLE = {
  1: { background: '#888' },
  2: { background: '#2F6BFF' },
  3: { background: '#E53935' },
  4: { background: '#f3641b' },
  9: { background: '#2F6BFF' },
  10: { background: '#E53935' },
  11: { background: '#f3641b' },
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
  1: {
    film: '待映',
    tv_series: '待播',
    short_series: '待播',
    show: '待播',
    stage_play: '待映',
  },
  2: {
    film: '即将上映',
    tv_series: '即将上线',
    short_series: '即将上线',
    show: '即将上线',
    stage_play: '即将上映',
  },
  3: {
    film: '热映中',
    tv_series: '热播中',
    short_series: '热播中',
    show: '热播中',
    stage_play: '演出中',
  },
  4: {
    film: '网络上线',
    tv_series: '已完结',
    short_series: '已完结',
    show: '已完结',
    stage_play: '已完结',
  },
}

export const STATUS_FILTER_LABEL = {
  1: '待播/待映',
  2: '即将上线/上映',
  3: '热播中/热映中',
  4: '完结/上线',
  5: '代言中',
  6: '已到期',
  7: '待发售',
  8: '已售罄',
  9: '已官宣',
  10: '开展中',
  11: '已结束',
}

// 统一函数：给定 (statusCode, typeCode) 得到卡片展示文案
export function getStatusDisplayLabel(statusId, typeCode) {
  return STATUS_DISPLAY_LABEL[statusId]?.[typeCode] || ''
}

export function canShowPurchase(statusId) {
  return statusId === 5 || statusId === 7
}
