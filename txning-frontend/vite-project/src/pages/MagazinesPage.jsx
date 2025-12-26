import { useMemo } from 'react'
import MagazineCard from '../components/cards/MagazineCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MagazinesPage() {
  const schema = useMemo(
    () => [
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (m) => (m.year ? String(m.year).trim() : ''),
      },
      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => (m.type ? String(m.type).trim() : ''),
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (m) => (m.status ? String(m.status).trim() : ''),
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
