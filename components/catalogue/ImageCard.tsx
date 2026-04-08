'use client'

import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import type { ImageData } from '@/types'

export default function ImageCard({ 
  image, 
  onClick 
}: { 
  image: ImageData, 
  onClick: () => void 
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="mb-2 sm:mb-3 break-inside-avoid"
    >
      <div 
        className="group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 tap-highlight-transparent"
        onClick={onClick}
      >
        <img
          src={image.public_url}
          alt={image.name || 'Nail Art'}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover/Tap Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
          <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {image.name && <p className="font-bold text-sm sm:text-base truncate">{image.name}</p>}
            {image.batch && <p className="text-xs sm:text-sm text-white/80 mt-0.5">{image.batch}</p>}
          </div>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full transform translate-y-[-10px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
