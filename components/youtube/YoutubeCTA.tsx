import { PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function YoutubeCTA({ title }: { title: string }) {
  const channelUrl = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL || "https://youtube.com/@nailelbi"
  
  return (
    <div className="bg-gradient-to-r from-rose/20 via-rose/10 to-ivory border border-rose/20 rounded-2xl p-6 md:p-8 text-center max-w-4xl mx-auto mb-10 w-full shadow-sm">
      <div className="inline-flex items-center justify-center p-3 bg-red-500 rounded-full text-white mb-4 shadow-md">
        <PlayCircle className="w-8 h-8 md:w-10 md:h-10 fill-current" />
      </div>
      <h2 className="font-display text-xl md:text-2xl font-bold text-ink mb-2">
        {title}
      </h2>
      <p className="text-muted text-sm md:text-base mb-6 max-w-lg mx-auto">
        Đăng ký kênh để không bỏ lỡ các video hướng dẫn mới nhất từ chuyên gia.
      </p>
      <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-12 shadow-lg transition-transform hover:scale-105 mx-auto">
        <a href={channelUrl} target="_blank" rel="noopener noreferrer">
          Đăng Ký Kênh →
        </a>
      </Button>
    </div>
  )
}
