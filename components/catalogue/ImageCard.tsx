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
        className="group relative cursor-pointer p-0 bg-white shadow-premium-sm hover:shadow-premium rounded-xl overflow-hidden transition-all duration-500 tap-highlight-transparent border border-border-soft/10"
        onClick={onClick}
      >
        <div className="overflow-hidden">
          <img
            src={image.public_url}
            alt={image.name || 'Nail Art'}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        {/* Subtle Bottom Bar (instead of full overlay) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {image.name && <p className="font-light text-sm tracking-wide">{image.name.toUpperCase()}</p>}
            {image.batch && <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1">{image.batch}</p>}
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
      </div>
    </motion.div>
  )
}
