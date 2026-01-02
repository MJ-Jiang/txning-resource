// src/domain/status.js

export const STATUS_STYLE = {
  1: { background: '#888' },
  2: { background: '#2F6BFF' },
  3: { background: '#E53935' },
  4: { background: '#f3641b' },
  9: { background: '#2F6BFF' },
  10: { background: '#E53935' },
  11: { background: '#f3641b' },
}

export const DEFAULT_STATUS_STYLE = { background: '#888' }

// ✅ 按 type 的展示文案（前端规则）
export const STATUS_LABEL_BY_TYPE = {
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

// ✅ 统一取 label：优先用“按 type 映射”，没有就 fallback 后端 name_zh
export function getStatusLabel(statusId, typeCode, statusNameById) {
  const byType = STATUS_LABEL_BY_TYPE?.[statusId]?.[typeCode]
  if (byType) return byType
  return statusNameById?.[statusId] || ''
}

export function getStatusStyle(statusId) {
  return STATUS_STYLE[statusId] || DEFAULT_STATUS_STYLE
}
export function getStatusDisplayLabel() {} //临时用完删
export function STATUS_FILTER_LABEL() {} //临时用完删
export function canShowPurchase() {} //临时用完删
