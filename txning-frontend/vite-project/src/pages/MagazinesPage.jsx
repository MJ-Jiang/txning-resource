import { useMemo } from 'react'
import MagazineCard from '../components/cards/MagazineCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function getMagazineTypes(m) {
  if (Array.isArray(m.types) && m.types.length) return m.types
  if (m.type) return [m.type]
  if (Array.isArray(m.tags) && m.tags.length) return m.tags
  return []
}

export default function MagazinesPage() {
  const schema = useMemo(
    () => [
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (m) => m.year,
      },
      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => getMagazineTypes(m), // array
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (m) => m.status,
      },
    ],
    []
  )

  return (
    <>
      <Navbar />
      <ResourceListContainer
        category="endorsements"
        schema={schema}
        renderCard={(item) => <MagazineCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title}
      />
      <Footer />
    </>
  )
}
