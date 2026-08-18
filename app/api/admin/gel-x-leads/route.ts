import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function requireUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

export async function GET() {
  const { supabase, user } = await requireUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await (supabase.from('gel_x_workshop_leads') as any).select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const { supabase, user } = await requireUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => null)
  if (!body?.id) return NextResponse.json({ error: 'Missing lead id' }, { status: 400 })
  const patch = { status: body.status, admin_note: String(body.admin_note || '').slice(0, 2000), updated_at: new Date().toISOString() }
  const { error } = await (supabase.from('gel_x_workshop_leads') as any).update(patch).eq('id', body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
