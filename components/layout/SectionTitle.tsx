import { cn } from "@/lib/utils/cn"

export default function SectionTitle({
  title,
  subtitle,
  className
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn("text-center mb-20 md:mb-24", className)}>
      <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-ink mb-6 tracking-tighter uppercase">
        {title} <span className="text-rose">.</span>
      </h2>
      {subtitle && (
        <p className="text-muted text-sm md:text-base max-w-2xl mx-auto font-light tracking-[0.3em] uppercase opacity-60">
          {subtitle}
        </p>
      )}
    </div>
  )
}
