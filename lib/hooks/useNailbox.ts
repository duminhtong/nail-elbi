import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const info = await res.json()
    throw new Error(info.error || 'Fetch error')
  }
  return res.json()
}

export interface NailboxItem {
  id: string
  name: string
  drive_file_id: string
  image_url?: string
  fallback_url?: string
  sizes: string[]
  forms: string[]
  price: number
  description?: string
  is_custom: boolean
}

export function useNailbox() {
  const { data, error, isLoading, mutate } = useSWR<NailboxItem[]>('/api/nailbox', fetcher)

  return {
    items: Array.isArray(data) ? data : undefined,
    isLoading,
    isError: error || (data && !Array.isArray(data) && (data as any).error),
    mutate
  }
}
