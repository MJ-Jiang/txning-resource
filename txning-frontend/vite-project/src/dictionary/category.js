// ================================
// Category（前端信息架构）
// ================================

// 用于前端路由 & 页面语义（URL /drama /event）
export const CATEGORY_CODES = {
  DRAMA: 'drama',
  ENDORSEMENT: 'endorsement',
  EVENT: 'event',
  UGC: 'ugc',
  PERSONAL: 'personal',
  BANNERS: 'banners',
  ABOUTME: 'aboutme',
}

// 用于 UI 展示（标题、筛选、Tab）
export const CATEGORY_LABEL = {
  drama: '影视剧综',
  endorsement: '商务杂志',
  event: '官方活动',
  ugc: '图频',
  personal: '个人营业',
  banners: '轮播',
  aboutme: '个人简介',
}

// ================================
// Category（后端映射）
// ================================

// 前端 code → 后端 category_id
export const CATEGORY_CODE_TO_ID = {
  drama: 1,
  endorsement: 2,
  event: 3,
  ugc: 4,
  personal: 5,
  banners: 6,
  aboutme: 7,
}

// （可选）后端 category_id → 前端 code
export const CATEGORY_ID_TO_CODE = {
  1: 'drama',
  2: 'endorsement',
  3: 'event',
  4: 'ugc',
  5: 'personal',
  6: 'banners',
  7: 'aboutme',
}
