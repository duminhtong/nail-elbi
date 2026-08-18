'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-espresso-panel py-24 md:py-32 lg:py-48 rounded-b-[4rem] shadow-none">
      <div className="container px-4 mx-auto text-center relative z-10">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-rose mb-6 md:mb-10 tracking-tighter"
        >
          ELBI <span className="font-black text-rose">BEAUTY</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-rose-muted mb-12 md:mb-20 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Nail Design — Brow Lamination — Lash Lift
          <br />
          <span className="font-medium text-rose/80 italic">& Đào tạo chuyên gia thẩm mỹ thế hệ mới</span>
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto"
        >
          <Button asChild size="lg" className="w-full md:w-auto h-16 md:h-20 bg-charcoal-dark hover:bg-ink text-white rounded-xl shadow-none transition-all text-lg px-12 font-bold tracking-wide">
            <Link href="http://zalo.me/0901292729" target="_blank">
              TƯ VẤN NGAY
            </Link>
          </Button>
          
          <Button asChild size="lg" className="w-full md:w-auto h-16 md:h-20 bg-rose hover:bg-rose-dark text-white rounded-xl shadow-none transition-all text-lg px-12 font-bold tracking-wide">
            <Link href="/nailbox">
              NAILBOX BY ELBI
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full md:w-auto h-16 md:h-20 bg-espresso-panel hover:bg-espresso-panel text-rose rounded-xl border-2 border-espresso-line shadow-none transition-all text-lg px-12 font-bold tracking-wide">
            <Link href="/catalogue">
              BỘ SƯU TẬP
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Editorial Decorative Details */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-rose/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 border border-charcoal/5 rounded-full"></div>
    </section>
  )
}
