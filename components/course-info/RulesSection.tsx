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
    <Accordion type="single" defaultValue="rules" collapsible className="w-full bg-white rounded-2xl shadow-sm border border-border-soft overflow-hidden mb-6">
      <AccordionItem value="rules" className="border-none">
        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-rose/5 transition-colors">
          <h2 className="font-display font-bold text-xl md:text-2xl text-ink text-left">2. {content.title}</h2>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-3 mt-2">
            {content.items?.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-muted leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
