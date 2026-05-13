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
    <Accordion type="single" defaultValue="benefits" collapsible className="w-full bg-white rounded-2xl shadow-premium-sm border border-border-soft/10 overflow-hidden mb-12">
      <AccordionItem value="benefits" className="border-none">
        <AccordionTrigger className="px-10 py-8 hover:no-underline hover:bg-neu/50 transition-colors">
          <h2 className="font-display font-light text-2xl md:text-3xl text-ink text-left tracking-tight">
            {content.title.toUpperCase()}
          </h2>
        </AccordionTrigger>
        <AccordionContent className="px-10 pb-10 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Rights */}
            <div className="bg-white p-8 rounded-xl border border-border-soft/20">
              <div className="flex items-center gap-4 mb-8 text-rose font-light uppercase tracking-[0.2em] text-xs">
                <Star className="w-5 h-5 fill-rose" />
                <h3>Quyền lợi học viên</h3>
              </div>
              <ul className="space-y-5">
                {content.rights?.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                     <span className="w-1.5 h-1.5 rounded-full bg-rose mt-1.5 shrink-0" />
                     <span className="text-muted text-sm md:text-base leading-relaxed font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Obligations */}
            <div className="bg-white p-8 rounded-xl border border-border-soft/20">
              <div className="flex items-center gap-4 mb-8 text-charcoal font-light uppercase tracking-[0.2em] text-xs">
                <ClipboardList className="w-5 h-5" />
                <h3>Nghĩa vụ học viên</h3>
              </div>
              <ul className="space-y-5">
                {content.obligations?.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                     <span className="w-1.5 h-1.5 rounded-full bg-charcoal mt-1.5 shrink-0" />
                     <span className="text-muted text-sm md:text-base leading-relaxed font-light">{item}</span>
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
