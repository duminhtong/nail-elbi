'use client'

import { useYoutube } from '@/lib/hooks/useYoutube'
import InterviewCard from '@/components/student-interviews/InterviewCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function InterviewGrid() {
  const { videos, isLoading, isError } = useYoutube('student_interview')

  if (isError) {
    return <div className="text-center py-10 text-red-500">Đã có lỗi xảy ra. Vui lòng tải lại trang.</div>
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden bg-white shadow-sm border border-border-soft">
            <Skeleton className="w-full md:w-2/5 aspect-video" />
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-center">
              <Skeleton className="w-3/4 h-6" />
              <Skeleton className="w-full h-16" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-border-soft max-w-3xl mx-auto">
        <p className="text-muted text-lg">Video phỏng vấn sẽ sớm được cập nhật.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full max-w-6xl mx-auto">
      {videos.map((video, index) => (
        <InterviewCard key={video.id} video={video} index={index} />
      ))}
    </div>
  )
}
