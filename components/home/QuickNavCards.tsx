'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Palette, PlaySquare, Camera, MessageSquareQuote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const cards = [
  {
    title: "Nail & Mi",
    description: "Bộ sưu tập Nail, Chân mày & Mi",
    icon: Palette,
    href: "/catalogue",
    color: "text-rose",
    bg: "bg-rose/10"
  },
  {
    title: "Học Nail Miễn Phí",
    description: "Video hướng dẫn từ NAIL ELBI",
    icon: PlaySquare,
    href: "/free-lessons",
    color: "text-sky-dark",
    bg: "bg-sky-dark/10"
  },
  {
    title: "Lớp Học",
    description: "Không gian học tập",
    icon: Camera,
    href: "/classroom",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Blog Làm Đẹp",
    description: "Bí quyết & Tin tức thẩm mỹ",
    icon: MessageSquareQuote,
    href: "/blog",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function QuickNavCards() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Link href="/gel-x-workshop" className="group mx-auto mb-8 block max-w-5xl border border-espresso-line bg-espresso-panel p-6 transition-colors hover:border-red md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-kicker mb-3">Workshop / Education</p>
            <h2 className="font-display text-3xl font-light tracking-[-0.05em] text-rose md:text-5xl">GEL X <span className="text-red">1 NGÀY</span></h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-rose-muted">Học là ứng dụng được salon — xem nội dung, kỹ thuật và thông tin workshop.</p>
          </div>
          <span className="inline-flex items-center border border-red bg-red px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-rose-light transition-colors group-hover:bg-rose group-hover:text-espresso">Truy cập khóa học Gel X ↗</span>
        </div>
      </Link>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
      >
        {cards.map((card, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Link href={card.href} className="block h-full tap-highlight-transparent">
              <Card className="h-full border border-espresso-line/10 shadow-none hover:shadow-none transition-all duration-500 hover:-translate-y-2 bg-espresso-panel rounded-2xl overflow-hidden group">
                <CardContent className="p-8 flex flex-col items-center text-center justify-center h-full gap-6">
                  <div className={`w-20 h-20 flex items-center justify-center rounded-full bg-espresso-panel-dark/10 ${card.color} group-hover:bg-rose group-hover:text-white transition-all duration-500`}>
                    <card.icon className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-light text-xl text-rose group-hover:text-rose transition-colors tracking-tight">
                      {card.title.toUpperCase()}
                    </h3>
                    <p className="text-xs text-rose-muted hidden sm:block font-light uppercase tracking-widest leading-loose">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
