import { NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createAdminClient()
  
  // First, get the image to find its storage path
  const { data: image, error: fetchError } = await adminClient
    .from('images')
    .select('storage_path')
    .eq('id', params.id)
    .single()

  if (fetchError || !image) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }

  // Delete from storage
  const { error: storageError } = await adminClient
    .storage
    .from('nail-images')
    .remove([(image as any).storage_path])

  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 })
  }

  // Delete from database
  const { error: dbError } = await adminClient
    .from('images')
    .delete()
    .eq('id', params.id)

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
