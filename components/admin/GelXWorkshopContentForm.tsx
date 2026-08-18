'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import type { GelXWorkshopContent } from '@/types'

const editableFields: Array<{ key: keyof GelXWorkshopContent; label: string }> = [
  { key: 'hero_claim', label: 'USP chính' },
  { key: 'hero_lead', label: 'Mô tả hero' },
  { key: 'usp_title', label: 'USP dòng 1' },
  { key: 'usp_subtitle', label: 'USP dòng 2' },
  { key: 'duration', label: 'Thời gian' },
  { key: 'objective', label: 'Mục tiêu' },
  { key: 'instructor', label: 'Người hướng dẫn' },
  { key: 'registration_label', label: 'Nhãn nút đăng ký' },
  { key: 'registration_url', label: 'Link đăng ký' },
]

export default function GelXWorkshopContentForm({ content, onSaved }: { content: GelXWorkshopContent; onSaved: () => void }) {
  const [draft, setDraft] = useState(content)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const setField = (key: keyof GelXWorkshopContent, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const save = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await (supabase.from('gel_x_workshop_content') as any).upsert({ ...draft, id: 'default', updated_at: new Date().toISOString() })
    setSaving(false)
    if (error) {
      toast({ variant: 'destructive', title: 'Không thể lưu', description: error.message })
      return
    }
    toast({ title: 'Đã lưu nội dung workshop' })
    onSaved()
  }

  return (
    <section className="rounded-2xl border border-border-soft bg-white p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-ink">Nội dung workshop</h3>
          <p className="text-sm text-muted">Chỉnh copy và CTA mà không sửa code.</p>
        </div>
        <Button onClick={save} disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu nội dung'}</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {editableFields.map(({ key, label }) => (
          <div key={key} className={key === 'hero_lead' ? 'md:col-span-2' : ''}>
            <Label htmlFor={`workshop-${key}`}>{label}</Label>
            <Input id={`workshop-${key}`} value={String(draft[key] || '')} onChange={(event) => setField(key, event.target.value)} />
          </div>
        ))}
      </div>
    </section>
  )
}
