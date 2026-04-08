'use client'

import React from 'react'
import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'
import PricingTable from '@/components/course-info/PricingTable'
import RulesSection from '@/components/course-info/RulesSection'
import BenefitsSection from '@/components/course-info/BenefitsSection'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export default function CourseInfoPage() {
  const { toast } = useToast()

  const handleCopyContact = () => {
    navigator.clipboard.writeText("Xin chào NAIL ELBI! Tôi muốn tìm hiểu về khóa học nail. Vui lòng tư vấn giúp tôi.")
    toast({
      title: "✓ Đã sao chép tin nhắn!",
      description: "Paste vào Zalo hoặc Facebook để liên hệ ngay với chúng tôi.",
      duration: 3000,
    })
  }

  return (
    <>
      <PageContainer>
        <SectionTitle 
          title="Thông Tin Khóa Học Nail" 
          subtitle="Mọi thứ bạn cần biết trước khi đăng ký học tại NAIL ELBI"
        />
        
        <div className="max-w-4xl mx-auto pb-20 md:pb-0">
          <PricingTable />
          <RulesSection />
          <BenefitsSection />

          {/* Student Interviews Teaser */}
          <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 text-center border border-border-soft shadow-sm">
             <h3 className="font-display font-bold text-xl md:text-2xl text-ink mb-3">
               Học viên nói gì về chúng tôi?
             </h3>
             <p className="text-muted mb-6">
               Hàng trăm học viên đã tốt nghiệp và thành công với nghề Nail. Hãy nghe chia sẻ thật từ họ.
             </p>
             <Button asChild variant="outline" className="rounded-xl border-rose text-rose hover:bg-rose/5">
               <Link href="/student-interviews">
                 Xem phỏng vấn học viên <ArrowRight className="w-4 h-4 ml-2" />
               </Link>
             </Button>
          </div>
        </div>
      </PageContainer>

      {/* Sticky Mobile Contact CTA */}
      <div className="fixed bottom-[64px] left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-border-soft flex items-center justify-between md:hidden z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="text-sm font-bold text-ink pl-2">Đăng ký khóa học?</div>
        <Button onClick={handleCopyContact} className="bg-rose hover:bg-rose-dark rounded-xl h-10 px-5 shadow-md">
          <Mail className="w-4 h-4 mr-2" />
          Liên hệ đăng ký
        </Button>
      </div>

      {/* Desktop Contact CTA (not sticky) */}
      <div className="hidden md:flex justify-center mb-16">
        <Button onClick={handleCopyContact} size="lg" className="bg-rose hover:bg-rose-dark rounded-xl h-14 px-10 text-lg shadow-lg">
          <Mail className="w-5 h-5 mr-3" />
          Liên hệ tư vấn khóa học
        </Button>
      </div>
    </>
  )
}
