'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const modules = [
  { index: '01', eyebrow: 'Nail / Brow / Lash', title: 'NAIL DESIGN', description: 'Bộ sưu tập thiết kế được làm để bạn tìm thấy cảm hứng cho lần hẹn tiếp theo.', href: '/catalogue', cta: 'Xem bộ sưu tập', tone: 'rose' },
  { index: '02', eyebrow: 'Education / Gel X', title: 'GEL X', description: 'Một ngày học tập trung vào kỹ thuật có thể mang thẳng vào nhịp làm salon.', href: '/gel-x-workshop', cta: 'Truy cập khóa học', tone: 'image' },
  { index: '03', eyebrow: 'Product / Nailbox', title: 'NAILBOX', description: 'Thiết kế làm tay, sẵn sàng cho không gian của bạn. Khám phá website Nailbox.', href: 'https://elbinailbox.com', cta: 'Khám phá Nailbox', tone: 'red' },
]

export default function QuickNavCards() {
  return (
    <section className="container mx-auto px-4 py-14 md:py-24" aria-labelledby="explore-title">
      <div className="mx-auto mb-10 flex max-w-6xl items-end justify-between border-b border-espresso-line pb-6">
        <div><p className="editorial-kicker mb-3">Explore / Elbi universe</p><h2 id="explore-title" className="font-display text-3xl font-light tracking-[-0.06em] text-rose md:text-5xl">Ba cách để bước vào Elbi.</h2></div>
        <span className="hidden text-xs uppercase tracking-[0.18em] text-rose-muted md:block">03 / 03</span>
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-12 md:grid-rows-[minmax(300px,1fr)_minmax(300px,1fr)]">
        {modules.map((module, index) => {
          const external = module.href.startsWith('http')
          return <Link key={module.index} href={module.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={`group relative min-h-[300px] overflow-hidden border border-espresso-line bg-espresso-panel p-6 transition-colors hover:border-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red md:min-h-0 md:p-8 ${index === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'} ${module.tone === 'red' ? 'bg-red' : ''}`}>
            {module.tone === 'image' && <Image src="/gel-x-workshop/gel-x-02.jpeg" alt="Kỹ thuật Gel X" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-105" />}
            <div className={`absolute inset-0 ${module.tone === 'image' ? 'bg-gradient-to-t from-espresso via-espresso/60 to-transparent' : module.tone === 'red' ? 'bg-red' : 'bg-[radial-gradient(circle_at_80%_20%,#3b211d,transparent_38%)]'}`} />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between"><span className="editorial-kicker text-rose-muted">{module.eyebrow}</span><span className="font-mono text-xs text-rose-muted">{module.index}</span></div>
              <div><h3 className="font-display text-4xl font-bold tracking-[-0.06em] text-rose md:text-6xl">{module.title}</h3><p className="mt-4 max-w-md text-sm leading-relaxed text-rose-muted">{module.description}</p><span className="mt-7 inline-flex items-center gap-2 border border-rose px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-rose transition-colors group-hover:bg-rose group-hover:text-espresso">{module.cta}<ArrowUpRight className="h-4 w-4" /></span></div>
            </div>
          </Link>
        })}
      </div>
    </section>
  )
}
