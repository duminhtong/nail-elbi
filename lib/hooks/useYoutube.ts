import useSWR from 'swr'
import type { YoutubeCategory, YoutubeVideo } from '@/types'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const info = await res.json()
    throw new Error(info.error || 'Fetch error')
  }
  return res.json()
}

export function useYoutube(category?: YoutubeCategory) {
  const url = category ? `/api/youtube?category=${category}` : '/api/youtube'
  const { data, error, isLoading, mutate } = useSWR<YoutubeVideo[]>(url, fetcher)

  return {
    videos: Array.isArray(data) ? data : undefined,
    isLoading,
    isError: error || (data && !Array.isArray(data) && (data as any).error),
    mutate
  }
}
