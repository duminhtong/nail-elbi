'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Image as ImageIcon, Video, GraduationCap, Info } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function BottomNav() {
  const pathname = usePathname()
  
  // Hide on admin routes
  if (pathname.startsWith('/admin')) return null

  const items = [
    { icon: Home, label: 'Trang Chủ', href: '/' },
    { icon: ImageIcon, label: 'Mẫu Nail', href: '/catalogue' },
    { icon: Video, label: 'Học Nail', href: '/free-lessons' },
    { icon: GraduationCap, label: 'Lớp Học', href: '/classroom' },
    { icon: Info, label: 'Thông Tin', href: '/course-info' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-md border-t border-border-soft pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-between items-center px-2 h-[64px]">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full min-w-[48px] tap-highlight-transparent"
            >
              <item.icon
                className={cn(
                  "w-6 h-6 mb-1 transition-all",
                  isActive ? "text-rose scale-110" : "text-muted"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-rose" : "text-muted"
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
