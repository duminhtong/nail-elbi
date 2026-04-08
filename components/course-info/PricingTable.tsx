'use client'

import { useCourseInfo } from '@/lib/hooks/useCourseInfo'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { PricingContent } from '@/types'

export default function PricingTable() {
  const { courseInfo, isLoading, isError } = useCourseInfo('pricing')

  if (isError) return null

  if (isLoading) {
    return <Skeleton className="w-full h-64 rounded-2xl" />
  }

  if (!courseInfo || !courseInfo.content) return null

  const content = courseInfo.content as PricingContent

  return (
    <Accordion type="single" defaultValue="pricing" collapsible className="w-full bg-white rounded-2xl shadow-sm border border-border-soft overflow-hidden mb-6">
      <AccordionItem value="pricing" className="border-none">
        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-rose/5 transition-colors">
          <h2 className="font-display font-bold text-xl md:text-2xl text-ink text-left">1. {content.title}</h2>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="overflow-x-auto mt-2 rounded-xl border border-border-soft">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="bg-rose/10">
                  <th className="p-4 font-bold text-ink border-b border-border-soft">Khóa học</th>
                  <th className="p-4 font-bold text-ink border-b border-border-soft">Thời gian</th>
                  <th className="p-4 font-bold text-ink border-b border-border-soft text-right">Học phí</th>
                  <th className="p-4 font-bold text-ink border-b border-border-soft">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {content.courses?.map((course, idx) => (
                  <tr key={idx} className={`border-b border-border-soft last:border-0 hover:bg-rose/5 transition-colors ${course.name.includes('Toàn Diện') ? 'bg-amber-50/50' : ''}`}>
                    <td className="p-4 font-medium text-ink flex items-center gap-2">
                       {course.name.includes('Toàn Diện') && <span className="p-1 bg-amber-100 text-amber-700 text-xs rounded font-bold">HOT</span>}
                       {course.name}
                    </td>
                    <td className="p-4 text-muted">{course.duration}</td>
                    <td className="p-4 font-bold text-rose-dark text-right">{course.price} VNĐ</td>
                    <td className="p-4 text-sm text-muted">{course.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {content.notes && content.notes.length > 0 && (
            <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-sm text-ink mb-2">Lưu ý:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {content.notes.map((note, idx) => (
                  <li key={idx} className="text-sm text-muted">{note}</li>
                ))}
              </ul>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
