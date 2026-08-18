import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const recentSubmissions = new Map<string, number>()

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || body.website) return NextResponse.json({ ok: true })

  const fullName = String(body.full_name || '').trim()
  const contact = String(body.contact || '').trim()
  const consent = Boolean(body.consent_at)
  if (fullName.length < 2 || fullName.length > 120 || contact.length < 6 || contact.length > 80 || !consent) {
    return NextResponse.json({ error: 'Vui lòng điền họ tên, thông tin liên hệ và đồng ý để Elbi tư vấn.' }, { status: 400 })
  }

  const forwarded = request.headers.get('x-forwarded-for') || 'unknown'
  const last = recentSubmissions.get(forwarded) || 0
  if (Date.now() - last < 30_000) return NextResponse.json({ error: 'Bạn vui lòng chờ một chút rồi gửi lại nhé.' }, { status: 429 })
  recentSubmissions.set(forwarded, Date.now())

  const supabase = createClient()
  const { error } = await (supabase.from('gel_x_workshop_leads') as any).insert({
    full_name: fullName,
    contact,
    experience: String(body.experience || 'Chưa xác định'),
    area: String(body.area || '').trim() || null,
    note: String(body.note || '').trim() || null,
    source: String(body.source || 'gel-x-workshop').slice(0, 80),
    utm_source: String(body.utm_source || '').slice(0, 120) || null,
    utm_medium: String(body.utm_medium || '').slice(0, 120) || null,
    utm_campaign: String(body.utm_campaign || '').slice(0, 120) || null,
    consent_at: new Date().toISOString(),
  })
  if (error) return NextResponse.json({ error: 'Chưa thể ghi nhận thông tin. Vui lòng thử lại.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
