'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUp, Trash2, UploadCloud } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import type { GelXWorkshopGalleryItem } from '@/types'

export default function GelXWorkshopGalleryManager({ gallery, onChanged }: { gallery: GelXWorkshopGalleryItem[]; onChanged: () => void }) {
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return
    setUploading(true)
    const supabase = createClient()
    try {
      for (const file of files) {
        if (!file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) throw new Error('Ảnh phải là file hình và nhỏ hơn 8MB.')
        const path = `gel-x-workshop/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
        const uploaded = await supabase.storage.from('nail-images').upload(path, file)
        if (uploaded.error) throw uploaded.error
        const publicUrl = supabase.storage.from('nail-images').getPublicUrl(path).data.publicUrl
        const inserted = await (supabase.from('gel_x_workshop_gallery') as any).insert({ name: file.name, title: file.name.replace(/\.[^.]+$/, ''), storage_path: path, public_url: publicUrl, sort_order: gallery.length }).select().single()
        if (inserted.error) throw inserted.error
      }
      toast({ title: 'Đã tải ảnh lên' })
      onChanged()
    } catch (error) {
      toast({ variant: 'destructive', title: 'Upload thất bại', description: error instanceof Error ? error.message : 'Có lỗi xảy ra.' })
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const updateTitle = async (item: GelXWorkshopGalleryItem, title: string) => {
    await (createClient().from('gel_x_workshop_gallery') as any).update({ title }).eq('id', item.id)
    onChanged()
  }

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= gallery.length) return
    const reordered = [...gallery]
    ;[reordered[index], reordered[target]] = [reordered[target], reordered[index]]
    const supabase = createClient()
    await Promise.all(reordered.map((item, sortOrder) => (supabase.from('gel_x_workshop_gallery') as any).update({ sort_order: sortOrder }).eq('id', item.id)))
    onChanged()
  }

  const remove = async (item: GelXWorkshopGalleryItem) => {
    if (!window.confirm(`Xóa ảnh "${item.title}" khỏi workshop?`)) return
    const supabase = createClient()
    await supabase.storage.from('nail-images').remove([item.storage_path])
    await (supabase.from('gel_x_workshop_gallery') as any).delete().eq('id', item.id)
    onChanged()
  }

  return (
    <section className="rounded-2xl border border-border-soft bg-white p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div><h3 className="text-xl font-bold text-ink">Gallery kỹ thuật</h3><p className="text-sm text-muted">Upload, đổi tiêu đề, xóa và đổi thứ tự ảnh.</p></div>
        <label className="inline-flex cursor-pointer items-center rounded-lg bg-charcoal px-4 py-2 text-sm font-bold text-white"><UploadCloud className="mr-2 h-4 w-4" />{uploading ? 'Đang tải...' : 'Upload ảnh'}<input type="file" accept="image/*" multiple className="sr-only" onChange={upload} disabled={uploading} /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item, index) => (
          <article key={item.id} className="overflow-hidden rounded-xl border border-border-soft">
            <img src={item.public_url} alt={item.title} className="aspect-[4/3] w-full object-cover" />
            <div className="space-y-3 p-3">
              <Input defaultValue={item.title} aria-label={`Tiêu đề ảnh ${index + 1}`} onBlur={(event) => updateTitle(item, event.target.value)} />
              <div className="flex items-center justify-between gap-2"><Button variant="outline" size="icon" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Đưa ảnh lên"><ArrowUp className="h-4 w-4" /></Button><span className="text-xs text-muted">#{index + 1}</span><Button variant="outline" size="icon" onClick={() => move(index, 1)} disabled={index === gallery.length - 1} aria-label="Đưa ảnh xuống"><ArrowDown className="h-4 w-4" /></Button><Button variant="destructive" size="icon" onClick={() => remove(item)} aria-label="Xóa ảnh"><Trash2 className="h-4 w-4" /></Button></div>
            </div>
          </article>
        ))}
      </div>
      {gallery.length === 0 && <p className="border border-dashed border-border-soft p-8 text-center text-muted">Chưa có ảnh CMS. Page sẽ dùng ảnh fallback cho đến khi upload.</p>}
    </section>
  )
}
