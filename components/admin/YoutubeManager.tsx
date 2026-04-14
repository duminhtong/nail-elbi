'use client'

import { useState } from 'react'

import { useYoutube } from '@/lib/hooks/useYoutube'
import { extractYoutubeId, getYoutubeThumbnail } from '@/lib/utils/youtube'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus, PlayCircle, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { YoutubeCategory, YoutubeVideo } from '@/types'

function VideoList({ category }: { category: YoutubeCategory }) {
  const { videos, isLoading, isError, mutate } = useYoutube(category)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Xóa video "${title}"?`)) return

    setDeletingId(id)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Vui lòng đăng nhập lại.')

      const { error: deleteError } = await (supabase.from('youtube_videos') as any)
        .delete()
        .eq('id', id)

      if (deleteError) throw new Error(`Lỗi cập nhật CSDL: ${deleteError.message}`)
      toast({ title: "Đã xóa", description: `Video đã được xóa khỏi danh sách.` })
      mutate()
    } catch (err: any) {
      toast({ variant: "destructive", title: "Lỗi", description: err.message })
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) return <div className="p-8 text-center text-muted">Đang tải...</div>
  if (isError) return <div className="p-8 text-center text-red-500">Lỗi tải dữ liệu.</div>

  return (
    <div className="space-y-4">
      {videos?.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-xl border border-dashed text-muted">
          Chưa có video.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos?.map(video => (
            <Card key={video.id} className="overflow-hidden flex flex-col group relative">
               <div className="aspect-video relative bg-muted/20">
                 {video.thumbnail_url ? (
                   <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex justify-center items-center"><PlayCircle className="w-8 h-8 text-muted" /></div>
                 )}
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                   <Button variant="destructive" size="icon" onClick={() => handleDelete(video.id, video.title)} disabled={deletingId === video.id}>
                     <Trash2 className="w-4 h-4" />
                   </Button>
                 </div>
               </div>
               <CardContent className="p-4">
                 <h4 className="font-bold text-sm line-clamp-2" title={video.title}>{video.title}</h4>
                 <p className="text-xs text-muted mt-1 truncate" title={video.youtube_url}>{video.youtube_url}</p>
                 {video.description && <p className="text-xs text-muted mt-2 line-clamp-2">{video.description}</p>}
               </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function VideoForm({ category }: { category: YoutubeCategory }) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [adding, setAdding] = useState(false)
  const { mutate } = useYoutube(category)
  const { toast } = useToast()

  const previewId = extractYoutubeId(url)
  const previewThumbnail = previewId ? getYoutubeThumbnail(previewId) : null

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || !title) return
    setAdding(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Vui lòng đăng nhập lại.')

      const youtube_id = extractYoutubeId(url)
      if (!youtube_id) throw new Error('Link YouTube không hợp lệ.')

      const thumbnail_url = getYoutubeThumbnail(youtube_id)

      const { error: insertError } = await (supabase.from('youtube_videos') as any)
        .insert({
          title,
          description: description || null,
          youtube_url: url,
          youtube_id,
          category,
          thumbnail_url,
        })

      if (insertError) throw new Error(`Lỗi cập nhật CSDL: ${insertError.message}`)

      toast({ title: "Thành công", description: "Đã thêm video mới." })
      setUrl('')
      setTitle('')
      setDescription('')
      mutate()
    } catch (err: any) {
      toast({ variant: "destructive", title: "Lỗi", description: err.message })
    } finally {
      setAdding(false)
    }
  }

  return (
    <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-border-soft mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor={`url-${category}`}>Đường link YouTube *</Label>
          <Input id={`url-${category}`} required value={url} onChange={e => setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
        </div>
        <div>
          <Label htmlFor={`title-${category}`}>Tiêu đề Video *</Label>
          <Input id={`title-${category}`} required value={title} onChange={e => setTitle(e.target.value)} placeholder="Tiêu đề hiển thị trên web" />
        </div>
        <div>
          <Label htmlFor={`desc-${category}`}>Mô tả / Trích dẫn (Tùy chọn)</Label>
          <Textarea id={`desc-${category}`} value={description} onChange={e => setDescription(e.target.value)} placeholder={category === 'student_interview' ? "Lời chia sẻ của học viên..." : "Mô tả ngắn về bài học..."} rows={3} />
        </div>
        <Button type="submit" disabled={adding || !url || !title} className="w-full bg-ink hover:bg-black text-white">
          {adding ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý...</> : <><Plus className="w-4 h-4 mr-2" /> Thêm Video</>}
        </Button>
      </div>

      <div>
        <Label>Xem trước Thumbnail</Label>
        <div className="mt-2 w-full aspect-video rounded-xl bg-slate-100 border border-border-soft overflow-hidden flex items-center justify-center relative">
          {previewThumbnail ? (
            <img src={previewThumbnail} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-muted text-sm flex flex-col items-center">
              <PlayCircle className="w-10 h-10 mb-2 opacity-50" />
              Chưa có Link YouTube
            </div>
          )}
        </div>
      </div>
    </form>
  )
}

export default function YoutubeManager() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-ink">Quản lý Video YouTube</h2>
      
      <Tabs defaultValue="free_lesson" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-100 p-1">
          <TabsTrigger value="free_lesson" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Học Nail Miễn Phí</TabsTrigger>
          <TabsTrigger value="student_interview" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">Phỏng Vấn Học Viên</TabsTrigger>
        </TabsList>
        <TabsContent value="free_lesson" className="mt-0">
          <VideoForm category="free_lesson" />
          <h3 className="font-bold text-lg mb-4 mt-8">Danh sách Video (Học Miễn Phí)</h3>
          <VideoList category="free_lesson" />
        </TabsContent>
        <TabsContent value="student_interview" className="mt-0">
          <VideoForm category="student_interview" />
          <h3 className="font-bold text-lg mb-4 mt-8">Danh sách Video (Phỏng Vấn)</h3>
          <VideoList category="student_interview" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
