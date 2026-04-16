import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/types'

const supabase = createClient()

export function useBlog(slug?: string) {
  const fetcher = async () => {
    if (slug) {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (error) throw error
      return data as BlogPost
    } else {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as BlogPost[]
    }
  }

  const key = slug ? `blog-${slug}` : 'blogs'
  
  const { data, error, isLoading, mutate } = useSWR(key, fetcher)

  return {
    posts: !slug ? (data as BlogPost[]) : undefined,
    post: slug ? (data as BlogPost) : undefined,
    isLoading,
    isError: error,
    mutate
  }
}
