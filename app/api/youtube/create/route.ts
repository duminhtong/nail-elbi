import { NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'
import { extractYoutubeId, getYoutubeThumbnail } from '@/lib/utils/youtube'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createAdminClient()
  
  try {
    const { title, description, youtube_url, category } = await request.json()

    if (!title || !youtube_url || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const youtube_id = extractYoutubeId(youtube_url)
    
    if (!youtube_id) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    const thumbnail_url = getYoutubeThumbnail(youtube_id)

    const { data: insertData, error: insertError } = await (adminClient.from('youtube_videos') as any)
      .insert({
        title,
        description: description || null,
        youtube_url,
        youtube_id,
        category,
        thumbnail_url,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, video: insertData })
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
