import { useMemo } from 'react'
import EndorsementCard from '../components/cards/EndorsementCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDict } from '../providers/useDict'

export default function EndorsementsPage() {
  const { typeNameById, statusNameById, categoryByCode } = useDict()

  const categoryId = categoryByCode?.endorsement?.id
  

  const schema = useMemo(
    () => [
      {
        name: 'release_year',
        label: '年份',
        defaultValue: 'all',
        getValue: (d) => d.release_year,
      },
      {
        name: 'type_id',
        label: '类型',
        defaultValue: 'all',
        getValue: (d) => d.type_id,
        optionsLabel: (v) => typeNameById?.[v] ?? String(v),
      },
      {
        name: 'status_id',
        label: '状态',
        defaultValue: 'all',
        getValue: (d) => d.status_id,
        // ✅ 筛选项文案：直接用后端 /dict/statuses 的 name_zh
        optionsLabel: (v) => statusNameById?.[v] ?? String(v),
      },
    ],
    [typeNameById, statusNameById]
  )
  if (!categoryId) return null
  return (
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category={categoryId}
        schema={schema}
        renderCard={(item) => <EndorsementCard key={item.id} item={item} />}
        gridClassName="card-grid"
        searchKey={(m) => m.title}
      />
      <Footer />
    </div>
  )
}
