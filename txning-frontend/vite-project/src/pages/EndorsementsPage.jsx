import { useMemo } from 'react'
import EndorsementCard from '../components/cards/EndorsementCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TYPE_LABEL } from '../dictionary/type'
import { STATUS_FILTER_LABEL } from '../dictionary/status'

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
        getValue: (d) => d.type,
        optionsLabel: (v) => TYPE_LABEL[v] ?? v,
      },
      {
        name: 'status',
        label: '状态',
        defaultValue: 'all',
        getValue: (d) => d.status, // code
        optionsLabel: (v) => STATUS_FILTER_LABEL[v] ?? v,
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
