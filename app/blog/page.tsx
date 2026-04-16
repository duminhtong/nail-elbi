'use client'

import Link from 'next/link'
import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'
import { useBlog } from '@/lib/hooks/useBlog'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export default function BlogListPage() {
  const { posts, isLoading } = useBlog()

  return (
    <PageContainer>
      <SectionTitle 
        title="Blog & Tin Tức" 
        subtitle="Những bí quyết chăm sóc sắc đẹp và cập nhật mới nhất từ NAIL ELBI"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-3xl" />
          ))}
        </div>
      ) : posts?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
          <p className="text-muted">Chưa có bài viết nào. Hãy quay lại sau nhé!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden bg-white">
                <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="text-rose/20 font-display text-4xl font-bold italic">ELBI</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-ink">
                    Làm Đẹp
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-muted text-xs mb-3">
                    <Calendar size={14} />
                    {format(new Date(post.created_at), 'dd MMMM, yyyy', { locale: vi })}
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink mb-3 group-hover:text-rose transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-3 mb-6 leading-relaxed">
                    {post.excerpt || 'Khám phá ngay bài viết mới nhất từ chuyên gia tại ELBI BEAUTY...'}
                  </p>
                  <div className="flex items-center text-ink text-sm font-bold group-hover:gap-2 transition-all">
                    Đọc thêm <ArrowRight size={16} className="ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
