'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Image as ImageIcon, Video, Info, PenSquare } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function BottomNav() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin') || pathname === '/gel-x-workshop') return null
  const items = [
    { icon: Home, label: 'Trang chủ', href: '/' },
    { icon: ImageIcon, label: 'Mẫu đẹp', href: '/catalogue' },
    { icon: Video, label: 'Học miễn phí', href: '/free-lessons' },
    { icon: PenSquare, label: 'Blog', href: '/blog' },
    { icon: Info, label: 'Thông tin', href: '/course-info' },
  ]
  return <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-espresso-line bg-espresso/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"><div className="flex h-[64px] items-center justify-between px-2">{items.map((item) => { const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)); return <Link key={item.href} href={item.href} className="flex h-full min-w-[48px] flex-1 flex-col items-center justify-center text-[9px] uppercase tracking-[0.08em]"><item.icon className={cn('mb-1 h-5 w-5 transition-colors', active ? 'text-rose' : 'text-rose-muted')} /><span className={active ? 'text-rose' : 'text-rose-muted'}>{item.label}</span></Link> })}</div></nav>
}
