import { mockResources } from '../data/mockResources'
import { TYPE_LABEL } from '../dictionary/type'
import { getStatusDisplayLabel } from '../dictionary/status'
import { GENRE_LABEL } from '../dictionary/genre'
import { CITY_LABEL } from '../dictionary/city'

function mapResource(raw) {
  const type = raw.type ?? ''
  const status = raw.status ?? ''

  const genreCodes = Array.isArray(raw.genres) ? raw.genres : []
  const genreLabels = genreCodes.map((c) => GENRE_LABEL[c] ?? c)

  // ✅ city 统一成数组：支持 'shanghai' / ['shanghai','beijing'] / undefined
  const cityCodes = [].concat(raw.city || [])
  const cityLabels = cityCodes.map((c) => CITY_LABEL[c] ?? c)
  const relatedIds = Array.isArray(raw.relatedId)
    ? raw.relatedId.map((v) => String(v))
    : []
  return {
    id: raw.id != null ? String(raw.id) : '',

    category: raw.category,
    role: raw.role,
    title: raw.title_zh,
    year: raw.release_year,

    genres: genreCodes,
    genreLabels,

    type: type ?? '',
    status: status ?? '',
    typeLabel: TYPE_LABEL[type] ?? '',
    statusLabel: getStatusDisplayLabel(status, type),

    posterUrl: raw.poster_url,
    posterAlt: raw.poster_alt_zh ?? raw.poster_alt_zhalt ?? '',
    isFeatured: raw.is_featured,
    href: raw.href,

    platforms: Array.isArray(raw.platforms)
      ? raw.platforms
          .map((p) => ({
            code: p?.code ?? '',
            url: p?.url ?? null, // url 可以为 null
          }))
          .filter((p) => p.code) // ✅ 只要求 code
      : [],

    bookingPlatform: Array.isArray(raw.booking_platform)
      ? raw.booking_platform
          .map((t) => ({
            code: t?.code ?? '',
            url: t?.url ?? null,
          }))
          .filter((t) => t.code)
      : [],

    description: raw.description_zh,
    episodes: raw.episode_count,
    ratingValue: raw.rating_value,
    ratingUrl: raw.rating_url,

    // event 相关（有就带上，没有就是 undefined）
    eventDate: raw.event_date,
    dateGranularity: raw.date_granularity,
    timeText: raw.time_text,
    cityCodes,
    cityLabels,
    location: raw.location,

    ugcUrl: raw.ugc_url,
    ugcType: raw.ugc_type,
    ugcPlatform: raw.ugc_platform,
    relatedIds,
  }
}

export async function getResources() {
  return mockResources.map(mapResource)
}
