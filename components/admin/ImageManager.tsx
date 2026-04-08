'use client'

import { useState } from 'react'
import { useImages } from '@/lib/hooks/useImages'
import UploadForm from './UploadForm'
import { Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import type { ImageCategory } from '@/types'

export default function ImageManager({ category, title }: { category: ImageCategory, title: string }) {
  const { images, isLoading, isError, mutate } = useImages(category)
  const { toast } = useToast()
  
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn xóa ảnh "${name}" không? Hành động này không thể hoàn tác.`)) {
      return
    }

    setDeletingId(id)
    try {
      const res = await fetch(`/api/images/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Delete failed')
      }
      toast({ title: "Đã xóa", description: `Ảnh "${name}" đã được xóa khỏi hệ thống.` })
      mutate() // Refresh data
    } catch (err: any) {
      toast({ variant: "destructive", title: "Lỗi", description: err.message })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-ink">{title}</h2>
      
      <UploadForm category={category} onUploadSuccess={() => mutate()} />
      
      <div>
        <h3 className="font-bold text-lg mb-4 text-ink flex justify-between items-center">
          Danh sách ảnh đã tải lên
          <span className="text-sm font-normal text-muted bg-slate-100 px-3 py-1 rounded-full">{images?.length || 0} ảnh</span>
        </h3>
        
        {isError && <p className="text-red-500">Lỗi tải dữ liệu.</p>}
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}
          </div>
        ) : images?.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl border border-dashed border-border-soft text-muted">
            Chưa có ảnh nào. Hãy tải lên!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {images?.map((image) => (
              <Card key={image.id} className="overflow-hidden border-border-soft group relative shadow-sm">
                <div className="aspect-square relative flex items-center justify-center bg-muted/10">
                  <img 
                    src={image.public_url} 
                    alt={image.name || 'image'} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDelete(image.id, image.name)}
                      disabled={deletingId === image.id}
                      className="rounded-full h-10 w-10 shadow-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3 bg-white">
                  <p className="font-bold text-sm text-ink truncate" title={image.name}>{image.name}</p>
                  {image.batch && <p className="text-xs text-muted truncate" title={image.batch}>{image.batch}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
