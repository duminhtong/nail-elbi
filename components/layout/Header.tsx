'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function Header() {
  const pathname = usePathname()
  
  if (pathname.startsWith('/admin') || pathname === '/gel-x-workshop') return null

  const items = [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Mẫu Nail & Mi', href: '/catalogue' },
    { label: 'Học Miễn Phí', href: '/free-lessons' },
    { label: 'Lớp Học', href: '/classroom' },
    { label: 'Blog', href: '/blog' },
    { label: 'Thông Tin Khóa Học', href: '/course-info' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-espresso-line/60 bg-espresso/90 px-4 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between md:h-[72px]">
        <Link href="/" className="font-display text-lg font-black tracking-[0.16em] text-rose hover:text-rose-light transition-colors">
          NAIL ELBI
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return <Link key={item.href} href={item.href} className={cn("px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors", isActive ? "text-rose border-b border-red" : "text-rose-muted hover:text-rose")}>{item.label}</Link>
          })}
        </nav>
        <Link href="/admin" className="p-2 text-rose-muted transition-colors hover:text-rose" title="Quản trị" aria-label="Admin Login"><Lock className="h-4 w-4" /></Link>
      </div>
    </header>
  )
}
