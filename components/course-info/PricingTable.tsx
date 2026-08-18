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
    <Accordion type="single" defaultValue="pricing" collapsible className="w-full bg-espresso-panel rounded-2xl shadow-none border border-espresso-line/10 overflow-hidden mb-12">
      <AccordionItem value="pricing" className="border-none">
        <AccordionTrigger className="px-10 py-8 hover:no-underline hover:bg-espresso-panel/50 transition-colors">
          <h2 className="font-display font-light text-2xl md:text-3xl text-rose text-left tracking-tight">
            {content.title.toUpperCase()}
          </h2>
        </AccordionTrigger>
        <AccordionContent className="px-10 pb-10 pt-4">
          <div className="overflow-x-auto mt-2 border border-espresso-line/10 rounded-xl">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="bg-espresso-raised/40">
                  <th className="p-6 font-light text-xs uppercase tracking-[0.2em] text-rose border-b border-espresso-line/10">Khóa học</th>
                  <th className="p-6 font-light text-xs uppercase tracking-[0.2em] text-rose border-b border-espresso-line/10">Thời gian</th>
                  <th className="p-6 font-light text-xs uppercase tracking-[0.2em] text-rose border-b border-espresso-line/10 text-right">Học phí</th>
                  <th className="p-6 font-light text-xs uppercase tracking-[0.2em] text-rose border-b border-espresso-line/10">Ghi chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft/10">
                {content.courses?.map((course, idx) => (
                  <tr key={idx} className="group hover:bg-espresso-raised/30 transition-all">
                    <td className="p-6">
                       <div className="flex items-center gap-3">
                         {course.name.includes('Toàn Diện') && <span className="px-3 py-1 bg-rose text-white text-[9px] rounded-full font-bold tracking-widest">HOT</span>}
                         <span className="font-medium text-rose">{course.name}</span>
                       </div>
                    </td>
                    <td className="p-6 text-rose-muted font-light">{course.duration}</td>
                    <td className="p-6 font-light text-rose text-right text-xl italic">{course.price} <span className="text-[10px] opacity-60 not-italic">VNĐ</span></td>
                    <td className="p-6 text-sm text-rose-muted font-light">{course.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {content.notes && content.notes.length > 0 && (
            <div className="mt-10 p-8 rounded-xl bg-espresso-raised/40 border border-espresso-line/10">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-rose mb-6">Lưu ý quan trọng:</h4>
              <ul className="space-y-4">
                {content.notes.map((note, idx) => (
                  <li key={idx} className="text-sm text-rose-muted flex items-start gap-4 font-light leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose mt-1.5 shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
