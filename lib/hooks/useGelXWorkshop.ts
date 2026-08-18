'use client'

import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import type { GelXWorkshopContent, GelXWorkshopGalleryItem } from '@/types'

const fetchWorkshop = async () => {
  const supabase = createClient()
  const [{ data: content, error: contentError }, { data: gallery, error: galleryError }] = await Promise.all([
    supabase.from('gel_x_workshop_content').select('*').eq('id', 'default').maybeSingle(),
    supabase.from('gel_x_workshop_gallery').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: true }),
  ])
  if (contentError) throw contentError
  if (galleryError) throw galleryError
  return { content: content as GelXWorkshopContent | null, gallery: (gallery || []) as GelXWorkshopGalleryItem[] }
}

export function useGelXWorkshop() {
  return useSWR('gel-x-workshop-cms', fetchWorkshop)
}
