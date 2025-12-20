import { useMemo } from 'react'
import DramaCard from '../components/cards/DramaCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function getDramaPlatform(d) {
  if (d.platform) return d.platform
  if (Array.isArray(d.platforms) && d.platforms.length) return d.platforms[0]
  return ''
}

function getDramaGenres(d) {
  if (Array.isArray(d.genres)) return d.genres
  if (d.genre) return [d.genre]
  return []
}

export default function DramasPage() {
  const schema = useMemo(
    () => [
      {
        name: 'platform',
        label: '平台',
        defaultValue: 'all',
        getValue: (d) => getDramaPlatform(d),
      },
      {
        name: 'genre',
        label: '类型',
        defaultValue: 'all',
        getValue: (d) => getDramaGenres(d), // array
      },
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (d) => d.year,
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (d) => d.status,
      },
    ],
    []
  )

  return (
    <>
      <Navbar />
      <ResourceListContainer
        category="dramas"
        schema={schema}
        renderCard={(item) => <DramaCard key={item.id} item={item} />}
        gridClassName="drama-grid"
        searchKey={(d) => d.title}
      />
      <Footer />
    </>
  )
}
