import useSWR from 'swr'
import type { CourseInfoSection, CourseInfo } from '@/types'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const info = await res.json()
    throw new Error(info.error || 'Fetch error')
  }
  return res.json()
}

export function useCourseInfo(section: CourseInfoSection) {
  const { data, error, isLoading, mutate } = useSWR<CourseInfo>(`/api/course-info?section=${section}`, fetcher)

  return {
    courseInfo: data,
    isLoading,
    isError: error || (data && (data as any).error),
    mutate
  }
}
