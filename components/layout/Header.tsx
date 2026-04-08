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
    { label: 'Mẫu Nail', href: '/catalogue' },
    { label: 'Học Nail Miễn Phí', href: '/free-lessons' },
    { label: 'Lớp Học', href: '/classroom' },
    { label: 'Thông Tin Khóa Học', href: '/course-info' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full glass-header transition-all">
      <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center">
          <img src="/Elbi_Beauty_Logo.png" alt="Elbi Beauty" className="h-8 md:h-10 w-auto" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-rose",
                  isActive ? "text-rose" : "text-ink/80"
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
            className="p-2 text-muted hover:text-rose transition-colors"
            title="Quản trị"
            aria-label="Admin Login"
          >
            <Lock className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
