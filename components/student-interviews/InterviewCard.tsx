'use client'

import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { YoutubeVideo } from '@/types'

export default function InterviewCard({ video, index }: { video: YoutubeVideo, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full group tap-highlight-transparent">
        <Card className="h-full border-border-soft overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col md:flex-row">
          <div className="relative aspect-video w-full md:w-2/5 overflow-hidden bg-muted/20 shrink-0">
            {video.thumbnail_url ? (
              <img 
                src={video.thumbnail_url} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-muted/50" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                <PlayCircle className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
          </div>
          
          <CardContent className="p-4 md:p-6 flex-1 flex flex-col justify-center">
            <h3 className="font-bold text-ink text-lg md:text-xl line-clamp-2 leading-tight group-hover:text-rose transition-colors mb-3">
              {video.title}
            </h3>
            {video.description && (
              <p className="text-sm text-muted line-clamp-3 mb-4 flex-1 italic relative px-4 border-l-4 border-amber-300 bg-amber-50/50 py-2 rounded-r">
                "{video.description}"
              </p>
            )}
            <div className="mt-auto pt-2 flex items-center text-sm font-medium text-rose group-hover:text-rose-dark transition-colors">
              <span>▶ Xem Video Interview</span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  )
}
