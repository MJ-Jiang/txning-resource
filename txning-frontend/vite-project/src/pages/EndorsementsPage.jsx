import { useMemo } from 'react'
import EndorsementCard from '../components/cards/EndorsementCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { TYPE_LABEL } from '../dictionary/type'
import { STATUS_FILTER_LABEL } from '../dictionary/status'
import { CATEGORY_CODES } from '../dictionary/category'

export default function EndorsementsPage() {
  const schema = useMemo(
    () => [
      {
        name: 'release_year',
        label: '年份',
        defaultValue: 'all',
        // ✅ 新字段：release_year: number | null
        getValue: (d) => d.release_year,
      },
      {
        name: 'type_id',
        label: '类型',
        defaultValue: 'all',
        // ✅ 新字段：type_id: number | null
        getValue: (d) => d.type_id,
        optionsLabel: (v) => TYPE_LABEL[v] ?? String(v),
      },
      {
        name: 'status_id',
        label: '状态',
        defaultValue: 'all',
        // ✅ 新字段：status_id: number | null
        getValue: (d) => d.status_id,
        optionsLabel: (v) => STATUS_FILTER_LABEL[v] ?? String(v),
      },
    ],
    []
  )

  return (
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category={2}
        schema={schema}
        renderCard={(item) => <EndorsementCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title}
      />
      <Footer />
    </div>
  )
}
