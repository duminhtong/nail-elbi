'use client'

import { useState, useEffect } from 'react'
import { useCourseInfo } from '@/lib/hooks/useCourseInfo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { CourseInfoSection, PricingContent, RulesContent, BenefitsContent } from '@/types'

function EditorPanel({ section, title, renderEditor }: { section: CourseInfoSection, title: string, renderEditor: (data: any, setData: any) => React.ReactNode }) {
  const { courseInfo, isLoading, mutate } = useCourseInfo(section)
  const [content, setContent] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (courseInfo?.content) {
      setContent(JSON.parse(JSON.stringify(courseInfo.content))) // deep copy
    }
  }, [courseInfo])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/course-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content })
      })
      if (!res.ok) throw new Error('Cập nhật thất bại')
      toast({ title: "Thành công", description: `Đã lưu thay đổi cho mục ${title}` })
      mutate()
    } catch (err: any) {
      toast({ variant: "destructive", title: "Lỗi", description: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AccordionItem value={section} className="bg-white rounded-2xl mb-4 border border-border-soft overflow-hidden px-2">
      <AccordionTrigger className="px-4 py-5 hover:no-underline font-bold text-lg text-ink">
        {title}
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-6 border-t border-border-soft pt-4">
        {isLoading || !content ? (
          <div className="p-8 text-center text-muted flex items-center justify-center gap-2"><Loader2 className="animate-spin w-4 h-4"/> Đang tải...</div>
        ) : (
          <div className="space-y-6">
            {renderEditor(content, setContent)}
            
            <div className="flex justify-end pt-4 border-t border-border-soft">
              <Button onClick={handleSave} disabled={saving} className="bg-ink hover:bg-black text-white px-8">
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang lưu...</> : <><Save className="w-4 h-4 mr-2" /> Lưu thay đổi</>}
              </Button>
            </div>
            
            {courseInfo?.updated_at && (
              <p className="text-xs text-muted text-right">Cập nhật lần cuối: {new Date(courseInfo.updated_at).toLocaleString('vi-VN')}</p>
            )}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

export default function CourseInfoEditor() {
  
  const renderPricing = (data: PricingContent, setData: (data: PricingContent) => void) => {
    const updateTitle = (val: string) => setData({ ...data, title: val })
    const addCourse = () => setData({ ...data, courses: [...(data.courses||[]), { name: '', duration: '', price: '', note: '' }] })
    const updateCourse = (i: number, field: string, val: string) => {
      const newCourses = [...data.courses]
      newCourses[i] = { ...newCourses[i], [field]: val }
      setData({ ...data, courses: newCourses })
    }
    const removeCourse = (i: number) => setData({ ...data, courses: data.courses.filter((_, idx) => idx !== i) })
    
    // notes logic similar
    const addNote = () => setData({ ...data, notes: [...(data.notes||[]), ''] })
    const updateNote = (i: number, val: string) => {
      const newNotes = [...data.notes]
      newNotes[i] = val
      setData({ ...data, notes: newNotes })
    }
    const removeNote = (i: number) => setData({ ...data, notes: data.notes.filter((_, idx) => idx !== i) })

    return (
      <div className="space-y-6 flex flex-col">
        <div>
          <Label>Tiêu đề chính</Label>
          <Input value={data.title} onChange={e => updateTitle(e.target.value)} className="mt-1 font-bold" />
        </div>
        
        {/* Courses Table */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
             <h4 className="font-bold text-ink">Các Khóa Học</h4>
             <Button type="button" variant="outline" size="sm" onClick={addCourse}><Plus className="w-4 h-4 mr-1"/> Thêm Khóa</Button>
           </div>
           
           <div className="space-y-4">
             {data.courses?.map((c, i) => (
               <div key={i} className="flex flex-col md:flex-row gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 relative">
                 <div className="flex-1 space-y-3">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <div><Label>Tên Khóa</Label><Input value={c.name} onChange={e=>updateCourse(i,'name',e.target.value)} placeholder="VD: Khóa Cơ Bản"/></div>
                     <div><Label>Học phí</Label><Input value={c.price} onChange={e=>updateCourse(i,'price',e.target.value)} placeholder="VD: 3.500.000"/></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <div><Label>Thời gian</Label><Input value={c.duration} onChange={e=>updateCourse(i,'duration',e.target.value)} placeholder="VD: 1 tháng"/></div>
                     <div><Label>Ghi chú</Label><Input value={c.note} onChange={e=>updateCourse(i,'note',e.target.value)} placeholder="VD: Phù hợp người mới"/></div>
                   </div>
                 </div>
                 <div className="flex items-center justify-end md:items-start pt-[28px]">
                   <Button type="button" variant="destructive" size="icon" onClick={()=>removeCourse(i)}><Trash2 className="w-4 h-4"/></Button>
                 </div>
               </div>
             ))}
           </div>
        </div>
        
        {/* Notes */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
             <h4 className="font-bold text-ink">Lưu ý</h4>
             <Button type="button" variant="outline" size="sm" onClick={addNote}><Plus className="w-4 h-4 mr-1"/> Thêm Lưu ý</Button>
           </div>
           <div className="space-y-2">
             {data.notes?.map((n, i) => (
               <div key={i} className="flex gap-2">
                 <Input value={n} onChange={e=>updateNote(i, e.target.value)} />
                 <Button type="button" variant="destructive" size="icon" onClick={()=>removeNote(i)}><Trash2 className="w-4 h-4"/></Button>
               </div>
             ))}
           </div>
        </div>
      </div>
    )
  }

  const renderRules = (data: RulesContent, setData: (data: RulesContent) => void) => {
    const updateTitle = (val: string) => setData({ ...data, title: val })
    const addItem = () => setData({ ...data, items: [...(data.items||[]), ''] })
    const updateItem = (i: number, val: string) => {
      const newItems = [...data.items]
      newItems[i] = val
      setData({ ...data, items: newItems })
    }
    const removeItem = (i: number) => setData({ ...data, items: data.items.filter((_, idx) => idx !== i) })

    return (
      <div className="space-y-6">
        <div><Label>Tiêu đề chính</Label><Input value={data.title} onChange={e=>updateTitle(e.target.value)} className="mt-1 font-bold" /></div>
        <div className="space-y-4">
           <div className="flex items-center justify-between">
             <h4 className="font-bold text-ink">Quy định</h4>
             <Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="w-4 h-4 mr-1"/> Thêm dòng</Button>
           </div>
           <div className="space-y-2">
             {data.items?.map((item, i) => (
               <div key={i} className="flex gap-2 items-start">
                 <Textarea value={item} onChange={e=>updateItem(i, e.target.value)} rows={2} />
                 <Button type="button" variant="destructive" size="icon" className="shrink-0" onClick={()=>removeItem(i)}><Trash2 className="w-4 h-4"/></Button>
               </div>
             ))}
           </div>
        </div>
      </div>
    )
  }

  const renderBenefits = (data: BenefitsContent, setData: (data: BenefitsContent) => void) => {
    const updateTitle = (val: string) => setData({ ...data, title: val })
    
    const RenderList = ({ listKey, title }: { listKey: 'rights'|'obligations', title: string }) => {
      const addItem = () => setData({ ...data, [listKey]: [...(data[listKey]||[]), ''] })
      const updateItem = (i: number, val: string) => {
        const newList = [...data[listKey]]
        newList[i] = val
        setData({ ...data, [listKey]: newList })
      }
      const removeItem = (i: number) => setData({ ...data, [listKey]: data[listKey].filter((_, idx) => idx !== i) })

      return (
        <div className="space-y-4">
           <div className="flex items-center justify-between">
             <h4 className="font-bold text-ink">{title}</h4>
             <Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="w-4 h-4 mr-1"/> Thêm dòng</Button>
           </div>
           <div className="space-y-2">
             {data[listKey]?.map((item, i) => (
               <div key={i} className="flex gap-2 items-start">
                 <Textarea value={item} onChange={e=>updateItem(i, e.target.value)} rows={2} />
                 <Button type="button" variant="destructive" size="icon" className="shrink-0" onClick={()=>removeItem(i)}><Trash2 className="w-4 h-4"/></Button>
               </div>
             ))}
           </div>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        <div><Label>Tiêu đề chính</Label><Input value={data.title} onChange={e=>updateTitle(e.target.value)} className="mt-1 font-bold" /></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-100">
            <RenderList listKey="rights" title="Quyền lợi" />
          </div>
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
            <RenderList listKey="obligations" title="Nghĩa vụ" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-ink">Quản lý Thông Tin Khóa Học</h2>
      
      <Accordion type="single" defaultValue="pricing" collapsible className="w-full">
        <EditorPanel section="pricing" title="1. Bảng Giá Học Phí" renderEditor={renderPricing} />
        <EditorPanel section="rules" title="2. Quy Định Lớp Học" renderEditor={renderRules} />
        <EditorPanel section="benefits" title="3. Quyền Lợi & Nghĩa Vụ" renderEditor={renderBenefits} />
      </Accordion>
    </div>
  )
}
