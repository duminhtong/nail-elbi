'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-ivory to-rose/10 py-16 md:py-24 lg:py-32 rounded-b-3xl">
      <div className="container px-4 mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-ink mb-4 md:mb-6 tracking-tight"
        >
          ELBI BEAUTY
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-muted mb-8 md:mb-10 max-w-2xl mx-auto font-medium"
        >
          Chuyên Nail Design — Brow Lamination — Lash Lift & Đào tạo học viên chuyên nghiệp
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Button asChild size="lg" className="w-full sm:w-auto h-14 md:h-12 bg-ink hover:bg-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-base px-8 font-medium">
            <Link href="http://zalo.me/0901292729" target="_blank">
              💬 Tư vấn ngay
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 md:h-12 rounded-xl border-2 border-ink text-ink hover:bg-ink/5 transition-all text-base px-8 font-medium">
            <Link href="/catalogue">
              💅 Xem Mẫu Đẹp
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Decorative blurred circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-soft/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/3 translate-y-1/3"></div>
    </section>
  )
}
