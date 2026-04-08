'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'
import TabNav from '@/components/catalogue/TabNav'
import SearchBar from '@/components/catalogue/SearchBar'
import MasonryGrid from '@/components/catalogue/MasonryGrid'
import Lightbox from '@/components/catalogue/Lightbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useImages } from '@/lib/hooks/useImages'
import type { ImageCategory } from '@/types'

export default function CataloguePage() {
  const [activeTab, setActiveTab] = useState<'nail_menu' | 'student_work'>('nail_menu')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const { images, isLoading, isError } = useImages(activeTab as ImageCategory)

  const filteredImages = useMemo(() => {
    if (!images) return []
    if (!searchQuery.trim()) return images
    
    return images.filter(img => 
      img.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.batch?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [images, searchQuery])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <PageContainer>
      <SectionTitle 
        title="Bộ Sưu Tập Nail Art" 
      />

      <TabNav activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'student_work' && (
        <div className="bg-gradient-to-r from-sky-soft/20 via-sky-soft/10 to-transparent border border-sky-soft/30 rounded-2xl p-6 md:p-8 text-center max-w-4xl mx-auto mb-10">
          <h2 className="font-display text-xl md:text-2xl font-bold text-sky-900 mb-2">
            Tác Phẩm Học Viên NAIL ELBI
          </h2>
          <p className="text-muted text-sm md:text-base mb-6">
            Bạn cũng có thể làm được điều này! 💙
          </p>
          <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700 text-white rounded-full transition-transform hover:scale-105 shadow-md">
            <Link href="/course-info">
              ✨ Tìm hiểu khóa học
            </Link>
          </Button>
        </div>
      )}

      {activeTab === 'nail_menu' && (
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      )}

      {isError && (
        <div className="text-center py-10 text-red-500">Đã có lỗi xảy ra. Vui lòng tải lại trang.</div>
      )}

      {isLoading ? (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 w-full">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="mb-2 sm:mb-3 break-inside-avoid">
              <Skeleton className="w-full h-48 sm:h-64 rounded-xl sm:rounded-2xl" />
            </div>
          ))}
        </div>
      ) : filteredImages.length > 0 ? (
        <MasonryGrid images={filteredImages} onImageClick={openLightbox} />
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-border-soft">
          <p className="text-muted text-lg">Không tìm thấy mẫu nail nào.</p>
        </div>
      )}

      <Lightbox 
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onChangeIndex={setLightboxIndex}
      />
    </PageContainer>
  )
}
