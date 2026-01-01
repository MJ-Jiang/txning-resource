import { useMemo } from 'react'
import DramaCard from '../components/cards/DramaCard'
import ResourceListContainer from '../components/channels/ResourceListContainer'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PLATFORM_LABEL } from '../dictionary/platform'
import { TYPE_LABEL } from '../dictionary/type'
import { STATUS_FILTER_LABEL } from '../dictionary/status'
import { CATEGORY_CODES } from '../dictionary/category'

export default function DramasPage() {
  const schema = useMemo(
    () => [
      {
        name: 'platform_id',
        label: '平台',
        defaultValue: 'all',
        getValue: (d) => d.platform_ids,
        optionsLabel: (v) => PLATFORM_LABEL[v] ?? String(v),
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
        name: 'release_year',
        label: '年份',
        defaultValue: 'all',
        // ✅ 新字段：release_year: number | null
        getValue: (d) => d.release_year,
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
        // ✅ 后端 category_id（数字）
        category={1}
        schema={schema}
        renderCard={(item) => (
          <DramaCard key={item.id} item={item} categoryCode="drama" />
        )}
        gridClassName="card-grid"
        // ✅ 新字段：title
        searchKey={(d) => d.title}
      />
      <Footer />
    </div>
  )
}
