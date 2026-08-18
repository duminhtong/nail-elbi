'use client'

import { useEffect, useState } from 'react'
import type { GelXLeadStatus, GelXWorkshopLead } from '@/types'

const statuses: Array<[GelXLeadStatus, string]> = [['new', 'Mới'], ['contacted', 'Đã liên hệ'], ['consulted', 'Đã tư vấn'], ['registered', 'Đã đăng ký'], ['not_fit', 'Không phù hợp']]

export default function GelXLeadManager() {
  const [leads, setLeads] = useState<GelXWorkshopLead[]>([])
  const [filter, setFilter] = useState<GelXLeadStatus | 'all'>('all')
  useEffect(() => { fetch('/api/admin/gel-x-leads').then((response) => response.ok ? response.json() : []).then(setLeads) }, [])
  const update = async (lead: GelXWorkshopLead, patch: Partial<GelXWorkshopLead>) => {
    await fetch('/api/admin/gel-x-leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: lead.id, ...patch }) })
    setLeads((current) => current.map((item) => item.id === lead.id ? { ...item, ...patch } : item))
  }
  const visible = filter === 'all' ? leads : leads.filter((lead) => lead.status === filter)
  return <div className="space-y-6"><div><h2 className="text-2xl font-bold text-ink">Lead Gel X Workshop</h2><p className="text-sm text-muted">Danh sách chỉ dành cho tài khoản Admin đã đăng nhập.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => setFilter('all')} className="rounded-md border border-border-soft px-3 py-2 text-sm">Tất cả ({leads.length})</button>{statuses.map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className="rounded-md border border-border-soft px-3 py-2 text-sm">{label} ({leads.filter((lead) => lead.status === value).length})</button>)}</div><div className="overflow-x-auto rounded-2xl border border-border-soft bg-white"><table className="w-full min-w-[900px] text-left text-sm"><thead className="border-b border-border-soft bg-espresso-raised text-rose"><tr><th className="p-4">Ngày</th><th className="p-4">Học viên</th><th className="p-4">Liên hệ</th><th className="p-4">Kinh nghiệm</th><th className="p-4">Nguồn</th><th className="p-4">Trạng thái</th><th className="p-4">Ghi chú</th></tr></thead><tbody>{visible.map((lead) => <tr key={lead.id} className="border-b border-border-soft last:border-0"><td className="p-4 text-muted">{new Date(lead.created_at).toLocaleDateString('vi-VN')}</td><td className="p-4 font-bold text-ink">{lead.full_name}<div className="text-xs font-normal text-muted">{lead.area || 'Chưa có khu vực'}</div></td><td className="p-4"><a className="text-rose-dark underline" href={`tel:${lead.contact}`}>{lead.contact}</a></td><td className="p-4 text-muted">{lead.experience}</td><td className="p-4 text-muted">{lead.source}</td><td className="p-4"><select value={lead.status} onChange={(event) => update(lead, { status: event.target.value as GelXLeadStatus })} className="rounded border border-border-soft bg-white p-2">{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td><td className="p-4"><textarea defaultValue={lead.admin_note || ''} onBlur={(event) => update(lead, { admin_note: event.target.value })} className="min-w-[180px] rounded border border-border-soft p-2" placeholder="Ghi chú..." /></td></tr>)}</tbody></table>{visible.length === 0 && <p className="p-10 text-center text-muted">Chưa có lead ở trạng thái này.</p>}</div></div>
}
