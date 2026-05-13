import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export default function TabNav({
  activeTab,
  onChange
}: {
  activeTab: 'nail_menu' | 'brow_lamination' | 'lash_lift' | 'student_work',
  onChange: (tab: 'nail_menu' | 'brow_lamination' | 'lash_lift' | 'student_work') => void
}) {
  return (
    <div className="flex justify-center mb-16 px-4">
      <div className="flex items-center gap-2 md:gap-12 overflow-x-auto no-scrollbar pb-4 border-b border-border-soft/20 w-full max-w-4xl justify-center">
        {[
          { id: 'nail_menu', label: 'NAIL DESIGN' },
          { id: 'brow_lamination', label: 'BROW LAMINATION' },
          { id: 'lash_lift', label: 'LASH LIFT' },
          { id: 'student_work', label: 'STUDENT WORK' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id as any)}
            className={cn(
              "relative px-4 py-3 text-xs md:text-sm font-bold tracking-[0.2em] transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "text-rose" 
                : "text-muted hover:text-ink"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
