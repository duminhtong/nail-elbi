'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ImageData } from '@/types'

export default function ClassroomLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onChangeIndex
}: {
  images: ImageData[],
  currentIndex: number,
  isOpen: boolean,
  onClose: () => void,
  onChangeIndex: (index: number) => void
}) {
  
  useEffect(() => {
    if (!isOpen) return
    document.body.classList.add('body-scroll-lock')
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('body-scroll-lock')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, currentIndex, images.length])

  if (!isOpen || !images[currentIndex]) return null

  const image = images[currentIndex]
  
  const handlePrev = () => onChangeIndex((currentIndex - 1 + images.length) % images.length)
  const handleNext = () => onChangeIndex((currentIndex + 1) % images.length)

  let touchStartX = 0
  let touchEndX = 0
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX
    if (touchStartX - touchEndX > 50) handleNext()
    if (touchEndX - touchStartX > 50) handlePrev()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-center items-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 z-[101] bg-black/20 rounded-full">
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); handlePrev() }} className="absolute left-2 md:left-6 text-white/50 hover:text-white p-3 z-[101] hidden md:block">
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleNext() }} className="absolute right-2 md:right-6 text-white/50 hover:text-white p-3 z-[101] hidden md:block">
              <ChevronRight className="w-10 h-10" />
            </button>
          </>
        )}

        <div className="relative max-h-screen max-w-5xl w-full flex flex-col items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            src={image.public_url}
            alt={image.name || 'Classroom Room'}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
          
          {image.name && (
             <div className="mt-4 text-center">
               <span className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm">
                 {image.name}
               </span>
             </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
