'use client'

import { FormEvent, useState } from 'react'

export default function LeadForm({ registrationUrl }: { registrationUrl: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState('sending')
    const form = new FormData(event.currentTarget)
    const params = new URLSearchParams(window.location.search)
    const payload = { full_name: form.get('full_name'), contact: form.get('contact'), experience: form.get('experience'), area: form.get('area'), note: form.get('note'), website: form.get('website'), source: params.get('utm_source') || 'gel-x-workshop', utm_source: params.get('utm_source'), utm_medium: params.get('utm_medium'), utm_campaign: params.get('utm_campaign'), consent_at: form.get('consent') }
    const response = await fetch('/api/gel-x-leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (!response.ok) { const data = await response.json().catch(() => ({})); setMessage(data.error || 'Có lỗi xảy ra, bạn thử lại nhé.'); setState('error'); return }
    setState('sent')
    setMessage('Đã nhận thông tin. Elbi sẽ liên hệ tư vấn cho bạn sớm.')
  }
  if (state === 'sent') return <div className="border border-red bg-espresso-panel p-6 text-center"><p className="text-lg font-bold text-rose">{message}</p><a href={registrationUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex bg-red px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-rose-light">Mở Zalo để được tư vấn ↗</a></div>
  return <form onSubmit={submit} className="grid gap-4 border border-espresso-line bg-espresso-panel p-5 md:grid-cols-2 md:p-7"><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /><div><label className="editorial-kicker" htmlFor="full_name">Họ tên</label><input required id="full_name" name="full_name" className="mt-2 w-full border-b border-espresso-line bg-transparent px-0 py-3 text-rose outline-none focus:border-red" placeholder="Tên của bạn" /></div><div><label className="editorial-kicker" htmlFor="contact">Số điện thoại / Zalo</label><input required id="contact" name="contact" className="mt-2 w-full border-b border-espresso-line bg-transparent px-0 py-3 text-rose outline-none focus:border-red" placeholder="Bạn muốn Elbi liên hệ qua đâu?" /></div><div><label className="editorial-kicker" htmlFor="experience">Bạn đang ở giai đoạn nào?</label><select id="experience" name="experience" className="mt-2 w-full border-b border-espresso-line bg-espresso-panel px-0 py-3 text-rose outline-none"><option>Chưa bắt đầu</option><option>Đang học nail</option><option>Đang làm salon</option><option>Muốn nâng kỹ thuật Gel X</option></select></div><div><label className="editorial-kicker" htmlFor="area">Khu vực</label><input id="area" name="area" className="mt-2 w-full border-b border-espresso-line bg-transparent px-0 py-3 text-rose outline-none focus:border-red" placeholder="Tỉnh / thành phố" /></div><div className="md:col-span-2"><label className="editorial-kicker" htmlFor="note">Câu hỏi dành cho Elbi</label><textarea id="note" name="note" rows={3} className="mt-2 w-full border border-espresso-line bg-transparent p-3 text-rose outline-none focus:border-red" placeholder="Bạn muốn được tư vấn điều gì?" /></div><label className="flex items-start gap-3 text-xs leading-relaxed text-rose-muted md:col-span-2"><input required type="checkbox" name="consent" value="yes" className="mt-1 accent-red" /> Tôi đồng ý để Elbi Beauty liên hệ tư vấn thông tin workshop Gel X.</label><button disabled={state === 'sending'} className="bg-red px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-rose-light transition-colors hover:bg-rose hover:text-espresso disabled:opacity-60 md:col-span-2">{state === 'sending' ? 'Đang gửi...' : 'Nhận tư vấn khóa Gel X ↗'}</button>{state === 'error' && <p className="text-sm text-red md:col-span-2">{message}</p>}</form>
}
