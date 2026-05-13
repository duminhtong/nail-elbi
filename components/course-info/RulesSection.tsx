'use client'

import { useCourseInfo } from '@/lib/hooks/useCourseInfo'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle2 } from 'lucide-react'
import type { RulesContent } from '@/types'

export default function RulesSection() {
  const { courseInfo, isLoading, isError } = useCourseInfo('rules')

  if (isError) return null

  if (isLoading) {
    return <Skeleton className="w-full h-48 rounded-2xl" />
  }

  if (!courseInfo || !courseInfo.content) return null

  const content = courseInfo.content as RulesContent

  return (
    <Accordion type="single" defaultValue="rules" collapsible className="w-full bg-white rounded-2xl shadow-premium-sm overflow-hidden mb-12 border border-border-soft/10">
      <AccordionItem value="rules" className="border-none">
        <AccordionTrigger className="px-10 py-8 hover:no-underline hover:bg-neu/50 transition-colors">
          <h2 className="font-display font-light text-2xl md:text-3xl text-ink text-left tracking-tight">
            {content.title.toUpperCase()}
          </h2>
        </AccordionTrigger>
        <AccordionContent className="px-10 pb-10 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.items?.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-6 rounded-xl bg-neu/30 border border-white">
                <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-rose" />
                </div>
                <span className="text-muted font-light leading-relaxed text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
