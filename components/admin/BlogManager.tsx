'use client'

import { useState } from 'react'
import { useBlog } from '@/lib/hooks/useBlog'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Plus, PenSquare, Loader2, Globe } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { BlogPost } from '@/types'

export default function BlogManager() {
  const { posts, isLoading, mutate } = useBlog()
  const [isEditing, setIsEditing] = useState(false)
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const handleEdit = (post: BlogPost | null) => {
    setCurrentPost(post || {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      meta_title: '',
      meta_description: '',
      status: 'published'
    })
    setIsEditing(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPost?.title || !currentPost?.slug) return
    setSaving(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Vui lòng đăng nhập lại.')

      const postData = {
        ...currentPost,
        updated_at: new Date().toISOString()
      }

      let error
      if (currentPost.id) {
        const { error: updateError } = await (supabase.from('blogs') as any).update(postData).eq('id', currentPost.id)
        error = updateError
      } else {
        const { error: insertError } = await (supabase.from('blogs') as any).insert(postData)
        error = insertError
      }

      if (error) throw error

      toast({ title: "Thành công", description: "Đã lưu bài viết." })
      setIsEditing(false)
      setCurrentPost(null)
      mutate()
    } catch (err: any) {
      toast({ variant: "destructive", title: "Lỗi", description: err.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Xóa bài viết "${title}"?`)) return
    try {
      const { error } = await (supabase.from('blogs') as any).delete().eq('id', id)
      if (error) throw error
      toast({ title: "Đã xóa", description: "Bài viết đã được gỡ bỏ." })
      mutate()
    } catch (err: any) {
      toast({ variant: "destructive", title: "Lỗi", description: err.message })
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-ink">{currentPost?.id ? 'Sửa bài viết' : 'Viết bài mới'}</h2>
          <Button variant="outline" onClick={() => setIsEditing(false)}>Hủy</Button>
        </div>

        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-border-soft space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tiêu đề bài viết *</Label>
              <Input 
                value={currentPost?.title} 
                onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                placeholder="Ví dụ: Bí quyết giữ móng tay bền đẹp"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Đường dẫn (Slug) *</Label>
              <Input 
                value={currentPost?.slug} 
                onChange={e => setCurrentPost({...currentPost, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                placeholder="bi-quyet-giu-mong-ben-dep"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tóm tắt (Excerpt)</Label>
            <Textarea 
              value={currentPost?.excerpt || ''} 
              onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
              placeholder="Mô tả ngắn hiển thị ở danh sách tin tức..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Nội dung bài viết *</Label>
            <Textarea 
              value={currentPost?.content} 
              onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
              placeholder="Viết nội dung bài viết tại đây..."
              className="min-h-[300px]"
              required
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl space-y-4 border border-border-soft">
            <h3 className="font-bold text-sm flex items-center gap-2"><Globe size={16}/> Tối ưu SEO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input 
                    value={currentPost?.meta_title || ''} 
                    onChange={e => setCurrentPost({...currentPost, meta_title: e.target.value})}
                    placeholder="Tiêu đề hiển thị trên Google"
                  />
               </div>
               <div className="space-y-2">
                  <Label>SEO Description</Label>
                  <Input 
                    value={currentPost?.meta_description || ''} 
                    onChange={e => setCurrentPost({...currentPost, meta_description: e.target.value})}
                    placeholder="Mô tả hiển thị trên Google"
                  />
               </div>
            </div>
          </div>

          <Button type="submit" disabled={saving} className="w-full bg-ink hover:bg-black text-white h-12">
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang lưu...</> : 'Lưu bài viết'}
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-ink">Quản lý Blog / Tin tức</h2>
        <Button onClick={() => handleEdit(null)} className="bg-rose hover:bg-rose-dark text-white">
          <Plus className="w-4 h-4 mr-2" /> Viết bài mới
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center p-12 text-muted">Đang tải bài viết...</div>
      ) : posts?.length === 0 ? (
        <div className="bg-white p-20 text-center rounded-2xl border border-dashed text-muted">
          Chưa có bài viết nào. Hãy bắt đầu SEO cho web của bạn!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts?.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="font-bold text-lg text-ink truncate">{post.title}</h4>
                  <p className="text-sm text-muted">/blog/{post.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(post)}>
                    <PenSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(post.id, post.title)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
