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
    title: "Học Viên Chia Sẻ",
    description: "Câu chuyện từ học viên",
    icon: MessageSquareQuote,
    href: "/student-interviews",
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
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white rounded-2xl overflow-hidden group">
                <CardContent className="p-5 md:p-6 flex flex-col items-center text-center justify-center h-full gap-3">
                  <div className={`p-4 rounded-xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg md:text-xl text-ink mb-1 group-hover:text-rose transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted hidden sm:block">
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
