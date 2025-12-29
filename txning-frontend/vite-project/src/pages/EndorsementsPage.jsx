import { useMemo } from 'react'
import EndorsementCard from '../components/cards/EndorsementCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function EndorsementsPage() {
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
        getValue: (m) => m.type,
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
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category="endorsement"
        schema={schema}
        renderCard={(item) => <EndorsementCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title}
      />
      <Footer />
    </div>
  )
}
