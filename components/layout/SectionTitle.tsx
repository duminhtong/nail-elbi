import { cn } from '@/lib/utils/cn'

export default function SectionTitle({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return <div className={cn('mb-16 border-b border-espresso-line pb-8 md:mb-20', className)}><p className="editorial-kicker mb-4">Elbi / Editorial</p><h2 className="font-display text-4xl font-light uppercase tracking-[-0.06em] text-rose md:text-6xl lg:text-7xl">{title}<span className="text-red">.</span></h2>{subtitle && <p className="mt-5 max-w-2xl text-sm leading-relaxed text-rose-muted md:text-base">{subtitle}</p>}</div>
}
