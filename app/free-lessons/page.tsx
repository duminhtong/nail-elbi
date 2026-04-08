import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'
import YoutubeCTA from '@/components/youtube/YoutubeCTA'
import LessonGrid from '@/components/free-lessons/LessonGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Học Nail Miễn Phí',
}

export default function FreeLessonsPage() {
  return (
    <PageContainer>
      <SectionTitle 
        title="Học Nail Miễn Phí" 
        subtitle="Những video hướng dẫn nail art từ đội ngũ NAIL ELBI — hoàn toàn miễn phí"
      />
      
      <YoutubeCTA title="🎬 Theo dõi kênh YouTube NAIL ELBI để nhận video mới nhất!" />
      
      <LessonGrid />
    </PageContainer>
  )
}
