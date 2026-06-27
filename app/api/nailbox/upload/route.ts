import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const notes = formData.get('notes') as string | null

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy tệp ảnh nào' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Kích thước ảnh quá lớn (>10MB)' }, { status: 400 })
    }

    const adminClient = createAdminClient()

    // Upload to 'nail-images' storage bucket under 'nailbox-uploads' directory
    const fileExt = file.name.split('.').pop() || 'jpg'
    const fileName = `hand_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const storagePath = `nailbox-uploads/${fileName}`
    
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to bucket
    const { error: uploadError } = await adminClient
      .storage
      .from('nail-images')
      .upload(storagePath, buffer, {
        contentType: file.type || 'image/jpeg',
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error("Storage upload error:", uploadError.message)
      return NextResponse.json({ error: `Lỗi tải ảnh lên: ${uploadError.message}` }, { status: 500 })
    }

    // Get public URL
    const { data: publicUrlData } = adminClient
      .storage
      .from('nail-images')
      .getPublicUrl(storagePath)

    return NextResponse.json({
      success: true,
      publicUrl: publicUrlData.publicUrl,
      fileName,
      storagePath,
      message: "Tải ảnh đo size móng thành công!"
    })

  } catch (error: any) {
    console.error('SERVER UPLOAD HAND ERROR:', error)
    return NextResponse.json({ error: `Lỗi hệ thống: ${error?.message || 'Không xác định'}` }, { status: 500 })
  }
}
