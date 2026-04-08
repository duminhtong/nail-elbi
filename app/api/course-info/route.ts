import { NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const section = searchParams.get('section')

  if (!section || !['pricing', 'rules', 'benefits'].includes(section)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
  }

  const supabase = createClient()
  const { data, error } = await supabase
    .from('course_info')
    .select('*')
    .eq('section', section)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { section, content } = await request.json()

    if (!section || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const adminClient = createAdminClient()
    
    // Check if section exists
    const { data: existingSection } = await adminClient
      .from('course_info')
      .select('id')
      .eq('section', section)
      .single()

    const supabaseQuery = adminClient.from('course_info') as any

    let error

    if (existingSection) {
      // Update
      const { error: updateError } = await supabaseQuery
        .update({ content, updated_at: new Date().toISOString() })
        .eq('section', section)
      error = updateError
    } else {
      // Insert
      const { error: insertError } = await supabaseQuery
        .insert({ section, content })
      error = insertError
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Content updated successfully' })
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
