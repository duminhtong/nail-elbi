'use client'

import { useYoutube } from '@/lib/hooks/useYoutube'
import LessonCard from '@/components/free-lessons/LessonCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function LessonGrid() {
  const { videos, isLoading, isError } = useYoutube('free_lesson')

  if (isError) {
    return <div className="text-center py-10 text-red-500">Đã có lỗi xảy ra. Vui lòng tải lại trang.</div>
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-2xl overflow-hidden bg-white shadow-sm border border-border-soft">
            <Skeleton className="w-full aspect-video" />
            <div className="p-4 space-y-3">
              <Skeleton className="w-3/4 h-5" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-border-soft">
        <p className="text-muted text-lg">Chưa có video nào. Vui lòng quay lại sau!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
      {videos.map((video, index) => (
        <LessonCard key={video.id} video={video} index={index} />
      ))}
    </div>
  )
}
