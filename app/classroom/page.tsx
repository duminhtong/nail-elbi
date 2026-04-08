import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'
import ClassroomGrid from '@/components/classroom/ClassroomGrid'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lớp Học',
}

export default function ClassroomPage() {
  return (
    <PageContainer>
      <SectionTitle 
        title="Thư Viện Lớp Học" 
        subtitle="Không gian học tập chuyên nghiệp tại NAIL ELBI"
      />
      
      <ClassroomGrid />
      
      <div className="mt-16 bg-gradient-to-r from-rose/20 via-rose/10 to-ivory rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-rose/20 shadow-sm">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-ink mb-4">
          Muốn học trong môi trường chuyên nghiệp này?
        </h3>
        <p className="text-muted text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Cơ sở vật chất hiện đại, dụng cụ đầy đủ và không gian truyền cảm hứng sẽ giúp bạn phát huy tối đa khả năng sáng tạo.
        </p>
        <Button asChild size="lg" className="bg-rose hover:bg-rose-dark text-white rounded-xl shadow-md transition-transform hover:scale-105 h-14 px-10 text-lg">
          <Link href="/course-info">
            Xem thông tin khóa học →
          </Link>
        </Button>
      </div>
    </PageContainer>
  )
}
