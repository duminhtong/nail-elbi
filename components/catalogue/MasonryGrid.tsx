'use client'

import { useMemo } from 'react'
import ImageCard from './ImageCard'
import type { ImageData } from '@/types'

export default function MasonryGrid({
  images,
  onImageClick
}: {
  images: ImageData[],
  onImageClick: (index: number) => void
}) {
  // We use CSS multi-column layout for pure CSS masonry
  // Tailwind classes: "columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3"
  
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 lg:gap-4 w-full">
      {images.map((image, i) => (
        <ImageCard 
          key={image.id} 
          image={image} 
          onClick={() => onImageClick(i)} 
        />
      ))}
    </div>
  )
}
