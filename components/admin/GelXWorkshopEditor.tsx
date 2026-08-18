'use client'

import { useGelXWorkshop } from '@/lib/hooks/useGelXWorkshop'
import GelXWorkshopContentForm from './GelXWorkshopContentForm'
import GelXWorkshopGalleryManager from './GelXWorkshopGalleryManager'
import type { GelXWorkshopContent } from '@/types'

const fallbackContent: GelXWorkshopContent = {
  id: 'default', hero_eyebrow: 'Workshop / Gel X', hero_title: 'GEL X', hero_subtitle: '1 NGÀY', hero_claim: 'HỌC LÀ ỨNG DỤNG ĐƯỢC SALON', hero_lead: '', usp_title: 'ÚP KHÔNG MÀI GỜ', usp_subtitle: 'KHÔNG BÙ CỨNG MÓNG', duration: '1 NGÀY', objective: 'ỨNG DỤNG THỰC CHIẾN SALON', instructor: 'Kim Ngân Lê', registration_label: 'Đăng ký tư vấn', registration_url: 'https://zalo.me/0901292729', curriculum: [], updated_at: '',
}

export default function GelXWorkshopEditor() {
  const { data, error, isLoading, mutate } = useGelXWorkshop()

  if (isLoading) return <p className="p-8 text-muted">Đang tải workshop...</p>

  return (
    <div className="space-y-8">
      <div><h2 className="text-2xl font-bold text-ink">Quản lý Gel X Workshop</h2><p className="text-sm text-muted">Chỉnh nội dung và gallery. Migration Supabase cần được chạy ở môi trường Preview trước khi lưu.</p></div>
      {error && <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">Chưa kết nối được CMS Workshop. Page public vẫn dùng nội dung fallback.</p>}
      <GelXWorkshopContentForm content={data?.content || fallbackContent} onSaved={() => mutate()} />
      <GelXWorkshopGalleryManager gallery={data?.gallery || []} onChanged={() => mutate()} />
    </div>
  )
}
