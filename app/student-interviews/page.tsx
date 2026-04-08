import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'
import YoutubeCTA from '@/components/youtube/YoutubeCTA'
import InterviewGrid from '@/components/student-interviews/InterviewGrid'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Học Viên Chia Sẻ',
}

export default function StudentInterviewsPage() {
  return (
    <PageContainer>
      <SectionTitle 
        title="Học Viên Nói Gì Về NAIL ELBI?" 
        subtitle="Nghe chia sẻ thật từ những học viên đã hoàn thành khóa học"
      />
      
      <YoutubeCTA title="🎬 Xem thêm video chia sẻ trên kênh YouTube của chúng tôi!" />
      
      <InterviewGrid />
      
      <div className="mt-16 sm:mt-24 text-center bg-sky-soft/10 p-8 md:p-12 rounded-3xl border border-sky-soft/30 max-w-3xl mx-auto">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-ink mb-4">
          Bạn cũng muốn trở thành học viên NAIL ELBI?
        </h3>
        <p className="text-muted mb-8 text-base md:text-lg">
          Hãy bắt đầu hành trình của bạn với chúng tôi ngay hôm nay. 
          Môi trường học tập chuyên nghiệp, tận tâm đang chờ bạn.
        </p>
        <Button asChild size="lg" className="bg-rose hover:bg-rose-dark text-white rounded-xl shadow-md px-10 h-14 text-lg">
          <Link href="/course-info">
            Xem khóa học →
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
