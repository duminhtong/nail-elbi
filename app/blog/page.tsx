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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[450px] rounded-2xl" />
          ))}
        </div>
      ) : posts?.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-2xl border border-border-soft/20 shadow-premium-sm">
          <p className="text-muted font-light tracking-widest italic uppercase">Chưa có bài viết nào. Hãy quay lại sau nhé!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts?.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full border border-border-soft/10 p-0 shadow-premium-sm hover:shadow-premium transition-all duration-500 rounded-2xl bg-white flex flex-col overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden shrink-0">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-neu flex items-center justify-center text-rose/20 font-display text-4xl font-light italic tracking-widest">ELBI</div>
                  )}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-ink shadow-premium-sm border border-border-soft/10">
                    Kiến Thức
                  </div>
                </div>
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-muted text-[10px] font-light uppercase tracking-widest mb-6 opacity-60">
                    <Calendar size={12} className="text-rose" />
                    {format(new Date(post.created_at), 'dd MMMM, yyyy', { locale: vi })}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-light text-ink mb-4 group-hover:text-rose transition-colors line-clamp-2 leading-tight tracking-tight uppercase">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-3 mb-8 leading-relaxed font-light">
                    {post.excerpt || 'Khám phá ngay bài viết mới nhất từ chuyên gia tại ELBI BEAUTY...'}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-rose transition-all group-hover:translate-x-2">
                      ĐỌC THÊM <ArrowRight size={12} className="ml-2" />
                    </span>
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
