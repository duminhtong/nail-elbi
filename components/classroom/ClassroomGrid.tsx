'use client'

import { useState } from 'react'
import { useImages } from '@/lib/hooks/useImages'
import { Skeleton } from '@/components/ui/skeleton'
import ClassroomLightbox from './ClassroomLightbox'
import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import type { ImageData } from '@/types'

export default function ClassroomGrid() {
  const { images, isLoading, isError } = useImages('classroom')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (isError) {
    return <div className="text-center py-10 text-red-500">Đã có lỗi xảy ra. Vui lòng tải lại trang.</div>
  }

  if (isLoading) {
    return (
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 w-full">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="mb-2 sm:mb-3 break-inside-avoid">
            <Skeleton className="w-full h-48 sm:h-64 rounded-xl sm:rounded-2xl" />
          </div>
        ))}
      </div>
    )
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-32 px-8 bg-white rounded-2xl shadow-premium-sm border border-border-soft/10">
        <p className="text-muted text-xl font-light tracking-wide italic">Hình ảnh lớp học sẽ sớm được cập nhật.</p>
      </div>
    )
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-6 w-full">
        {images.map((image, i) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-6 break-inside-avoid"
          >
            <div 
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-premium-sm hover:shadow-premium border border-border-soft/10 p-0 transition-all duration-500 tap-highlight-transparent"
              onClick={() => openLightbox(i)}
            >
              <div className="overflow-hidden">
                <img
                  src={image.public_url}
                  alt={image.name || 'Classroom'}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ClassroomLightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onChangeIndex={setLightboxIndex}
      />
    </>
  )
}
