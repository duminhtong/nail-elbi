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
    <div className={cn("text-center mb-8 md:mb-12", className)}>
      <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-3 md:mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
