import { NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'
import { generateImageName } from '@/lib/utils/nameGenerator'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const category = formData.get('category') as string
    const batch = formData.get('batch') as string | null

    if (!files || files.length === 0 || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const adminClient = createAdminClient()

    // Process files
    const uploadedImages: any[] = []
    
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'File too large (>5MB)' }, { status: 400 })
      }

      // Get current counter for this category
      const { data: counterData, error: counterError } = await adminClient
        .from('counters')
        .select('value')
        .eq('key', category)
        .limit(1)
        .maybeSingle()

      if (counterError) {
        return NextResponse.json({ error: `Failed to get counter: ${counterError.message}` }, { status: 500 })
      }

      const currentCount = counterData ? (counterData as any).value : 0
      const newCount = currentCount + 1
      const generatedName = generateImageName(category, currentCount)

      // Upload to storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${category}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const storagePath = `${category}/${fileName}`
      
      // We need to convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await adminClient
        .storage
        .from('nail-images')
        .upload(storagePath, buffer, {
          contentType: file.type,
        })

      if (uploadError) {
        return NextResponse.json({ error: `Storage error: ${uploadError.message}` }, { status: 500 })
      }

      const { data: publicUrlData } = adminClient
        .storage
        .from('nail-images')
        .getPublicUrl(storagePath)

      // Insert into DB
      const { data: insertData, error: insertError } = await (adminClient.from('images') as any)
        .insert({
          name: generatedName,
          category,
          storage_path: storagePath,
          public_url: publicUrlData.publicUrl,
          batch: batch || null,
        })
        .select()
        .single()

      if (insertError) {
        return NextResponse.json({ error: `DB Insert error: ${insertError.message}` }, { status: 500 })
      }

      // Update counter (or insert if it didn't exist)
      if (counterData) {
        await (adminClient.from('counters') as any)
          .update({ value: newCount })
          .eq('key', category)
      } else {
        await (adminClient.from('counters') as any)
          .insert({ key: category, value: newCount })
      }

      uploadedImages.push(insertData)
    }

    return NextResponse.json({ success: true, images: uploadedImages })
  } catch (error: any) {
    console.error('SERVER UPLOAD ERROR:', error)
    return NextResponse.json({ error: `Server error: ${error?.message || 'Unknown exception'}` }, { status: 500 })
  }
}
