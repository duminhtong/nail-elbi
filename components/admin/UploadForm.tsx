'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadCloud, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { ImageCategory } from '@/types'

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
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('category', category)
      if (category === 'student_work' && batch) {
        formData.append('batch', batch)
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      toast({ title: "Thành công", description: `Đã tải lên ${files.length} ảnh.` })
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
