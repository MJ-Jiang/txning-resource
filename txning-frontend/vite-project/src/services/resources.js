import { mockResources } from '../data/mockResources'

const TYPE_LABEL = {
  film: '电影',
  tv_series: '电视剧',
  short_series: '短剧',
  show: '综艺',
  stage_play: '话剧',
}
const STATUS_LABEL = {
  not_yet_released: {
    film: '待映',
    tv_series: '待播',
    short_series: '待播',
    show: '待播',
    stage_play: '待映',
  },
  upcoming: {
    film: '即将上映',
    tv_series: '即将上线',
    short_series: '即将上线',
    show: '即将上线',
    stage_play: '即将上映',
  },
  now_showing: {
    film: '热映中',
    tv_series: '热播中',
    short_series: '热播中',
    show: '热播中',
    stage_play: '演出中',
  },
  ended: {
    film: '网络上线',
    tv_series: '已完结',
    short_series: '已完结',
    show: '已完结',
    stage_play: '已完结',
  },
}

function mapResource(raw) {
  const type = raw.type
  const status = raw.status
  const statusLabel = STATUS_LABEL[status]?.[type] ?? ''
  return {
    id: raw.id,
    category: raw.category,
    title: raw.title_zh,
    year: raw.release_year,
    genres: raw.genres,
    type,
    typeLabel: TYPE_LABEL[type] ?? '',
    posterUrl: raw.poster_url,
    posterAlt: raw.poster_alt_zh,
    isFeatured: raw.is_featured,
    status,
    statusLabel,
    href: raw.href,
    platforms: raw.platforms,
    description: raw.description_zh,
    episodes: raw.episode_count,
    ratingValue: raw.rating_value,
    ratingUrl: raw.rating_url,
  }
}

export async function getResources() {
  return mockResources.map(mapResource)
}
