import { createContext, useContext, useEffect, useState } from 'react'
import { apiGet } from '@/services/api'

const DictContext = createContext(null)

export function DictProvider({ children }) {
  const [statusNameById, setStatusNameById] = useState({})
  const [typeNameById, setTypeNameById] = useState({})
  const [genreNameById, setGenreNameById] = useState({})
  const [platformNameById, setPlatformNameById] = useState({})
  const [platformCodeById, setPlatformCodeById] = useState({})
  const [platformById, setPlatformById] = useState({})

  const [typeCodeById, setTypeCodeById] = useState({})
  const [cityNameById, setCityNameById] = useState({})
  const [categoryById, setCategoryById] = useState({})
  const [categoryByCode, setCategoryByCode] = useState({})

  const [ugcPlatformNameById, setUgcPlatformNameById] = useState({})
  const [ugcPlatformByCode, setUgcPlatformByCode] = useState({})

  const [bookingPlatformNameById, setBookingPlatformNameById] = useState({})
  const [bookingPlatformCodeById, setBookingPlatformCodeById] = useState({})
  const [bookingPlatformById, setBookingPlatformById] = useState({})
  const [bookingPlatformByCode, setBookingPlatformByCode] = useState({})

  useEffect(() => {
    let alive = true

    async function loadDicts() {
      const data = await apiGet('/dict/all')
      if (!alive) return

      const statuses = data?.statuses ?? []
      const types = data?.types ?? []
      const genres = data?.genres ?? []
      const platforms = data?.platforms ?? []
      const cities = data?.cities ?? []
      const categories = data?.categories ?? []
      const ugcPlatforms = data?.ugc_platforms ?? data?.ugcPlatforms ?? []
      const bookingPlatforms =
        data?.booking_platforms ?? data?.bookingPlatforms ?? []

      setStatusNameById(
        Object.fromEntries(statuses.map((s) => [s.id, s.name_zh]))
      )

      setTypeNameById(Object.fromEntries(types.map((t) => [t.id, t.name_zh])))
      setTypeCodeById(Object.fromEntries(types.map((t) => [t.id, t.code])))

      setGenreNameById(Object.fromEntries(genres.map((g) => [g.id, g.name_zh])))

      setPlatformNameById(
        Object.fromEntries(platforms.map((p) => [p.id, p.name_zh]))
      )
      setPlatformCodeById(
        Object.fromEntries(platforms.map((p) => [p.id, p.code]))
      )
      setPlatformById(Object.fromEntries(platforms.map((p) => [p.id, p])))

      setCityNameById(Object.fromEntries(cities.map((c) => [c.id, c.name_zh])))

      setCategoryById(Object.fromEntries(categories.map((c) => [c.id, c])))
      setCategoryByCode(Object.fromEntries(categories.map((c) => [c.code, c])))

      setUgcPlatformNameById(
        Object.fromEntries(ugcPlatforms.map((p) => [p.id, p.name_zh]))
      )
      setUgcPlatformByCode(
        Object.fromEntries(ugcPlatforms.map((p) => [p.code, p]))
      )

      setBookingPlatformNameById(
        Object.fromEntries(bookingPlatforms.map((p) => [p.id, p.name_zh]))
      )
      setBookingPlatformCodeById(
        Object.fromEntries(bookingPlatforms.map((p) => [p.id, p.code]))
      )
      setBookingPlatformById(
        Object.fromEntries(bookingPlatforms.map((p) => [p.id, p]))
      )
      setBookingPlatformByCode(
        Object.fromEntries(bookingPlatforms.map((p) => [p.code, p]))
      )
    }

    loadDicts().catch((e) => {
      if (!alive) return
      console.error('Failed to load dicts', e)
    })

    return () => {
      alive = false
    }
  }, [])

  return (
    <DictContext.Provider
      value={{
        statusNameById,
        typeNameById,
        typeCodeById,
        genreNameById,

        platformNameById,
        platformCodeById,
        platformById,

        cityNameById,
        categoryById,
        categoryByCode,

        ugcPlatformNameById,
        ugcPlatformByCode,

        bookingPlatformNameById,
        bookingPlatformCodeById,
        bookingPlatformById,
        bookingPlatformByCode,
      }}
    >
      {children}
    </DictContext.Provider>
  )
}

export function useDictContext() {
  const ctx = useContext(DictContext)
  if (!ctx) throw new Error('useDictContext must be used within DictProvider')
  return ctx
}
