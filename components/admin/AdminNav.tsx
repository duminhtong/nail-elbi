'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminNav() {
  const router = useRouter()
  
  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border-soft shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-display text-xl font-bold text-ink hover:text-rose transition-colors">
            ELBI BEAUTY <span className="text-rose-dark">Admin</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-muted hover:text-ink">
            <Link href="/" target="_blank">
              <Globe className="w-4 h-4 mr-2" />
              Xem website
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-rose-dark text-rose-dark hover:bg-rose-dark hover:text-white transition-colors">
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Trang Chủ / Đăng xuất</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
