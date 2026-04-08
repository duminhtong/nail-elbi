'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { toast } = useToast()
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Sai email hoặc mật khẩu. Vui lòng thử lại.')
      setLoading(false)
    } else {
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng quản trị viên NAIL ELBI.",
      })
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="inline-flex items-center text-muted hover:text-ink mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Về trang chủ
        </Link>
        
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-border-soft w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-rose-dark" />
            </div>
            <h1 className="font-display text-2xl font-bold text-ink">Quản Trị</h1>
            <p className="text-muted text-sm mt-1">ELBI BEAUTY ADMIN</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
                placeholder="admin@nailelbi.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-ink hover:bg-black text-white rounded-xl text-base"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
