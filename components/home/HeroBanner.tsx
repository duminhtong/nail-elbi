'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 md:py-32 lg:py-48 rounded-b-[4rem] shadow-premium-sm">
      <div className="container px-4 mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-ink mb-6 md:mb-10 tracking-tighter"
        >
          ELBI <span className="font-black text-rose">BEAUTY</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-3xl text-muted mb-12 md:mb-20 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Nail Design — Brow Lamination — Lash Lift
          <br />
          <span className="font-medium text-ink/80 italic">& Đào tạo chuyên gia thẩm mỹ thế hệ mới</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button asChild size="lg" className="w-full sm:w-auto h-16 md:h-20 bg-charcoal-dark hover:bg-ink text-white rounded-xl shadow-premium transition-all text-lg px-12 font-bold tracking-wide">
            <Link href="http://zalo.me/0901292729" target="_blank">
              TƯ VẤN NGAY
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-16 md:h-20 bg-white hover:bg-neu text-rose rounded-xl border-2 border-rose/20 shadow-premium-sm transition-all text-lg px-12 font-bold tracking-wide">
            <Link href="/catalogue">
              BỘ SƯU TẬP
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Editorial Decorative Details */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-rose/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 border border-charcoal/5 rounded-full"></div>
    </section>
  )
}
