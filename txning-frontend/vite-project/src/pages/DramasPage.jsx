import { useMemo } from 'react'
import DramaCard from '../components/cards/DramaCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDict } from '../providers/useDict'

export default function DramasPage() {
  const { platformNameById, typeNameById, statusNameById, categoryByCode } =
    useDict()

  const categoryId = categoryByCode?.drama?.id
  if (!categoryId) return null

  const schema = useMemo(
    () => [
      {
        name: 'platform_id',
        label: '平台',
        defaultValue: 'all',
        // d.platform_ids: number[] | null
        getValue: (d) => d.platform_ids,
        optionsLabel: (v) => platformNameById?.[v] ?? String(v),
      },
      {
        name: 'type_id',
        label: '类型',
        defaultValue: 'all',
        // d.type_id: number | null
        getValue: (d) => d.type_id,
        optionsLabel: (v) => typeNameById?.[v] ?? String(v),
      },
      {
        name: 'release_year',
        label: '年份',
        defaultValue: 'all',
        // d.release_year: number | null
        getValue: (d) => d.release_year,
      },
      {
        name: 'status_id',
        label: '状态',
        defaultValue: 'all',
        // d.status_id: number | null
        getValue: (d) => d.status_id,
        // ✅ 筛选项显示文本：直接用后端 /dict/statuses 的 name_zh
        optionsLabel: (v) => statusNameById?.[v] ?? String(v),
      },
    ],
    [platformNameById, typeNameById, statusNameById]
  )

  return (
    <div className="page">
      <Navbar />
      <ResourceListContainer
        category={categoryId}
        schema={schema}
        renderCard={(item) => (
          <DramaCard key={item.id} item={item} categoryCode="drama" />
        )}
        gridClassName="card-grid"
        searchKey={(d) => d.title}
      />
      <Footer />
    </div>
  )
}
