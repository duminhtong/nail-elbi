'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadCloud, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { ImageCategory } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { generateImageName } from '@/lib/utils/nameGenerator'

export default function UploadForm({
  category,
  onUploadSuccess
}: {
  category: ImageCategory,
  onUploadSuccess: () => void
}) {
  const [files, setFiles] = useState<File[]>([])
  const [batch, setBatch] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      // Validate file type and size
      const validFiles = selectedFiles.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          toast({ variant: "destructive", title: "Lỗi", description: `File ${file.name} quá lớn (>5MB).` })
          return false
        }
        if (!file.type.startsWith('image/')) {
          toast({ variant: "destructive", title: "Lỗi", description: `File ${file.name} không phải là ảnh.` })
          return false
        }
        return true
      })
      setFiles(prev => [...prev, ...validFiles])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) return

    setUploading(true)
    
    try {
      const supabase = createClient()
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Vui lòng đăng nhập lại.')

      for (const file of files) {
        // 1. Lấy counter
        const { data: counterData, error: counterError } = await supabase
          .from('counters')
          .select('value')
          .eq('key', category)
          .maybeSingle()

        if (counterError) throw new Error(`Lỗi đếm số: ${counterError.message}`)

        const currentCount = counterData ? counterData.value : 0
        const newCount = currentCount + 1
        const generatedName = generateImageName(category, currentCount)

        // 2. Upload Ảnh thẳng lên Supabase (Bỏ qua Vercel để không kẹt băng thông)
        const fileExt = file.name.split('.').pop()
        const fileName = `${category}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
        const storagePath = `${category}/${fileName}`

        const { error: uploadError } = await supabase
          .storage
          .from('nail-images')
          .upload(storagePath, file, { cacheControl: '3600', upsert: false })

        if (uploadError) throw new Error(`Lỗi lưu trữ: ${uploadError.message}`)

        const { data: publicUrlData } = supabase
          .storage
          .from('nail-images')
          .getPublicUrl(storagePath)

        // 3. Ghi vào Database
        const { error: insertError } = await supabase
          .from('images')
          .insert({
            name: generatedName,
            category,
            storage_path: storagePath,
            public_url: publicUrlData.publicUrl,
            batch: batch || null,
          })

        if (insertError) throw new Error(`Lỗi cơ sở dữ liệu: ${insertError.message}`)

        // 4. Cập nhật đếm
        if (counterData) {
          await supabase.from('counters').update({ value: newCount }).eq('key', category)
        } else {
          await supabase.from('counters').insert({ key: category, value: newCount })
        }
      }

      toast({ title: "Thành công", description: `Đã tải trực tiếp ${files.length} ảnh.` })
      setFiles([])
      setBatch('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      onUploadSuccess()
    } catch (err: any) {
      toast({ variant: "destructive", title: "Upload thất bại", description: err.message })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border-soft mb-8">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <UploadCloud className="w-5 h-5" /> Tải ảnh mới lên
      </h3>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <Label htmlFor="files">Chọn ảnh (JPG, PNG, WebP) - Tối đa 5MB/file</Label>
          <Input 
            id="files" 
            type="file" 
            multiple 
            accept="image/jpeg, image/png, image/webp, image/gif" 
            onChange={handleFileChange}
            ref={fileInputRef}
            className="mt-1"
          />
          {files.length > 0 && (
            <p className="text-sm text-green-600 mt-2">Đã chọn {files.length} file.</p>
          )}
        </div>

        {category === 'student_work' && (
          <div>
            <Label htmlFor="batch">Tên lớp / Khóa học (Tùy chọn)</Label>
            <Input 
              id="batch" 
              type="text" 
              placeholder="VD: Khóa Cơ Bản K12" 
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        <Button type="submit" disabled={uploading || files.length === 0} className="w-full bg-ink hover:bg-black text-white">
          {uploading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang tải lên...</>
          ) : (
            'Bắt đầu Tải Lên'
          )}
        </Button>
      </form>
    </div>
  )
}
