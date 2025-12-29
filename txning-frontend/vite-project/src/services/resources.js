import { mockResources } from '../data/mockResources'
import { TYPE_LABEL } from '../dictionary/type'
import { getStatusDisplayLabel } from '../dictionary/status'
import { GENRE_LABEL } from '../dictionary/genre'

function mapResource(raw) {
  const type = raw.type
  const status = raw.status

  const genreCodes = Array.isArray(raw.genres) ? raw.genres : []
  const genreLabels = genreCodes.map((c) => GENRE_LABEL[c] ?? c)
  return {
    id: raw.id,
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
    posterAlt: raw.poster_alt_zh,
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
    bookingPlatform: Array.isArray(raw.bookingPlatform)
      ? raw.bookingPlatform
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
  }
}

export async function getResources() {
  return mockResources.map(mapResource)
}
