import { useMemo } from 'react'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EventpageCard from '../components/cards/EventpageCard'

export default function EventsPage() {
  const schema = useMemo(
    () => [
      {
        name: 'year',
        label: '年份',
        defaultValue: 'all',
        getValue: (m) => m.year,
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (m) => m.status,
      },
      {
        name: 'type',
        label: '类型',
        defaultValue: 'all',
        getValue: (m) => m.type,
      },
      {
        name: 'city',
        label: '地点',
        defaultValue: 'all',
        getValue: (m) => m.city, // array
      },
    ],
    []
  )

  return (
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category="events"
        schema={schema}
        renderCard={(item) => <EventpageCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title}
      />
      <Footer />
    </div>
  )
}
