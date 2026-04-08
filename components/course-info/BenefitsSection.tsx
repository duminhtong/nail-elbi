'use client'

import { useCourseInfo } from '@/lib/hooks/useCourseInfo'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Star, ClipboardList } from 'lucide-react'
import type { BenefitsContent } from '@/types'

export default function BenefitsSection() {
  const { courseInfo, isLoading, isError } = useCourseInfo('benefits')

  if (isError) return null

  if (isLoading) {
    return <Skeleton className="w-full h-64 rounded-2xl" />
  }

  if (!courseInfo || !courseInfo.content) return null

  const content = courseInfo.content as BenefitsContent

  return (
    <Accordion type="single" defaultValue="benefits" collapsible className="w-full bg-white rounded-2xl shadow-sm border border-border-soft overflow-hidden mb-6">
      <AccordionItem value="benefits" className="border-none">
        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-rose/5 transition-colors">
          <h2 className="font-display font-bold text-xl md:text-2xl text-ink text-left">3. {content.title}</h2>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            
            {/* Rights */}
            <div className="bg-sky-50/50 p-5 rounded-2xl border border-sky-100">
              <div className="flex items-center gap-2 mb-4 text-sky-800 font-bold">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3>Quyền lợi</h3>
              </div>
              <ul className="space-y-3">
                {content.rights?.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                     <span className="text-sky-500 shrink-0 mt-1">•</span>
                     <span className="text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Obligations */}
            <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-2 mb-4 text-rose-dark font-bold">
                <ClipboardList className="w-5 h-5" />
                <h3>Nghĩa vụ</h3>
              </div>
              <ul className="space-y-3">
                {content.obligations?.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                     <span className="text-rose shrink-0 mt-1">•</span>
                     <span className="text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
