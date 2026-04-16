import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import PageContainer from '@/components/layout/PageContainer'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('blogs')
    .select('title, meta_title, meta_description, excerpt')
    .eq('slug', params.slug)
    .single()

  if (!post) return { title: 'Not Found' }

  const p = post as any
  return {
    title: p.meta_title || p.title,
    description: p.meta_description || p.excerpt,
    openGraph: {
      title: p.meta_title || p.title,
      description: p.meta_description || p.excerpt,
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) notFound()

  const p = post as any
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted hover:text-rose mb-8 transition-colors group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Quay lại danh sách
        </Link>

        <article className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-border-soft">
          {p.cover_image && (
            <div className="aspect-[21/9] w-full">
              <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <header className="mb-10 text-center">
              <div className="flex items-center justify-center gap-2 text-muted text-sm mb-4">
                <Calendar size={16} />
                {format(new Date(p.created_at), 'dd MMMM, yyyy', { locale: vi })}
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight">
                {p.title}
              </h1>
            </header>

            <div className="prose prose-rose max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-muted prose-p:leading-relaxed prose-img:rounded-3xl">
              {p.content.split('\n').map((line: string, i: number) => (
                line.trim() ? <p key={i}>{line}</p> : <br key={i} />
              ))}
            </div>
          </div>
        </article>
      </div>
    </PageContainer>
  )
}
