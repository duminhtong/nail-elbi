'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function Header() {
  const pathname = usePathname()
  
  if (pathname.startsWith('/admin')) return null

  const items = [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Mẫu Nail & Mi', href: '/catalogue' },
    { label: 'Học Miễn Phí', href: '/free-lessons' },
    { label: 'Lớp Học', href: '/classroom' },
    { label: 'Blog', href: '/blog' },
    { label: 'Thông Tin Khóa Học', href: '/course-info' },
  ]

  return (
    <header className="sticky top-6 z-50 w-full px-4 transition-all">
      <div className="container mx-auto max-w-7xl bg-white/90 backdrop-blur-md rounded-2xl shadow-premium px-6 md:px-8 h-16 md:h-20 flex items-center justify-between border border-white/20">
        <Link href="/" className="font-display text-2xl md:text-3xl font-black tracking-tighter text-ink hover:text-rose transition-colors">
          ELBI BEAUTY
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13px] lg:text-sm font-semibold transition-all px-4 py-2 rounded-lg",
                  isActive 
                    ? "text-rose font-black underline underline-offset-8 decoration-2" 
                    : "text-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center">
          <Link 
            href="/admin" 
            className="p-3 rounded-xl bg-neu-dark/10 hover:bg-rose/10 text-muted hover:text-rose transition-all shadow-premium-sm"
            title="Quản trị"
            aria-label="Admin Login"
          >
            <Lock className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
