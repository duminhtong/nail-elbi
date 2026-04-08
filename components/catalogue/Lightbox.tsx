'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Copy, ExternalLink, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import type { ImageData } from '@/types'

export default function Lightbox({
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
  const { toast } = useToast()
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    
    // Prevent body scroll
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
  
  const handlePrev = () => {
    onChangeIndex((currentIndex - 1 + images.length) % images.length)
  }
  
  const handleNext = () => {
    onChangeIndex((currentIndex + 1) % images.length)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`Tôi muốn chọn mẫu: ${image.name}`)
    toast({
      title: "✓ Đã sao chép tên mẫu!",
      description: "Hãy gửi cho NAIL ELBI để được tư vấn.",
      duration: 3000,
    })
  }

  // Swipe handling
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
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 z-[101] bg-black/20 rounded-full backdrop-blur-md"
        >
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev() }}
              className="absolute left-2 md:left-6 text-white/50 hover:text-white p-3 z-[101] hidden md:block"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext() }}
              className="absolute right-2 md:right-6 text-white/50 hover:text-white p-3 z-[101] hidden md:block"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </>
        )}

        <div 
          className="relative max-h-screen max-w-5xl w-full flex flex-col items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            src={image.public_url}
            alt={image.name || 'Nail Art'}
            className="max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
          
          <div className="w-full max-w-lg mx-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 mt-4 md:absolute md:bottom-4 md:mt-0 text-center">
            {image.category === 'student_work' ? (
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center justify-center gap-1.5 bg-sky-dark/20 text-sky-200 px-3 py-1 rounded-full text-xs font-medium mb-2">
                  <span className="text-sm">🌟</span> Tác phẩm học viên NAIL ELBI
                </div>
                {image.name && <h4 className="text-white font-bold text-lg mb-1">{image.name}</h4>}
                {image.batch && <p className="text-white/70 text-sm mb-3">{image.batch}</p>}
                
                <Button asChild size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full px-6">
                  <Link href="/course-info">
                    Xem khóa học →
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <h4 className="text-white font-bold text-lg">{image.name}</h4>
                  <p className="text-white/60 text-sm">NAIL ELBI COLLECTION</p>
                </div>
                <Button 
                  onClick={handleCopy}
                  className="w-full sm:w-auto bg-rose hover:bg-rose-dark text-white rounded-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  💅 Chọn mẫu này
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
