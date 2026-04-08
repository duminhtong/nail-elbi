'use client'

import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { YoutubeVideo } from '@/types'

export default function LessonCard({ video, index }: { video: YoutubeVideo, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full group tap-highlight-transparent">
        <Card className="h-full border-border-soft overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col">
          <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
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
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                <PlayCircle className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
          </div>
          
          <CardContent className="p-4 md:p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-ink text-base md:text-lg line-clamp-2 leading-tight group-hover:text-rose transition-colors mb-2">
              {video.title}
            </h3>
            {video.description && (
              <p className="text-sm text-muted line-clamp-2 mb-4 flex-1">
                {video.description}
              </p>
            )}
            <div className="mt-auto pt-3 flex items-center text-sm font-medium text-rose group-hover:text-rose-dark transition-colors">
              <span>▶ Xem Video</span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  )
}
