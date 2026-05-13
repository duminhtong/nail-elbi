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
        <Card className="h-full border border-border-soft/10 p-0 shadow-premium-sm hover:shadow-premium transition-all duration-500 rounded-xl bg-white flex flex-col group overflow-hidden">
          <div className="relative aspect-video w-full overflow-hidden">
            {video.thumbnail_url ? (
              <img 
                src={video.thumbnail_url} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-neu flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-muted/30" />
              </div>
            )}
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-rose shadow-premium">
                <PlayCircle className="w-10 h-10" />
              </div>
            </div>
          </div>
          
          <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
            <h3 className="font-display text-lg font-light text-ink line-clamp-2 leading-tight group-hover:text-rose transition-colors mb-4 uppercase tracking-tight">
              {video.title}
            </h3>
            {video.description && (
              <p className="text-sm text-muted line-clamp-2 mb-6 flex-1 font-light leading-relaxed">
                {video.description}
              </p>
            )}
            <div className="mt-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose transition-all group-hover:translate-x-2 inline-flex items-center">
                XEM VIDEO <PlayCircle size={12} className="ml-2" />
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  )
}
