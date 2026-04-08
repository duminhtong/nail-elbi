import useSWR from 'swr'
import type { ImageCategory, ImageData } from '@/types'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const info = await res.json()
    throw new Error(info.error || 'Fetch error')
  }
  return res.json()
}

export function useImages(category?: ImageCategory) {
  const url = category ? `/api/images?category=${category}` : '/api/images'
  const { data, error, isLoading, mutate } = useSWR<ImageData[]>(url, fetcher)

  return {
    images: Array.isArray(data) ? data : undefined,
    isLoading,
    isError: error || (data && !Array.isArray(data) && (data as any).error),
    mutate
  }
}
