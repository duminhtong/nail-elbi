import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export default function TabNav({
  activeTab,
  onChange
}: {
  activeTab: 'nail_menu' | 'student_work',
  onChange: (tab: 'nail_menu' | 'student_work') => void
}) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-white rounded-full p-1 border border-border-soft shadow-sm max-w-full overflow-x-auto mx-4 no-scrollbar">
        <button
          onClick={() => onChange('nail_menu')}
          className={cn(
            "relative px-6 sm:px-8 py-2.5 text-sm sm:text-base font-medium rounded-full transition-colors whitespace-nowrap",
            activeTab === 'nail_menu' ? "text-white" : "text-muted hover:text-ink"
          )}
        >
          {activeTab === 'nail_menu' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-rose rounded-full"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">💅 Mẫu Nail</span>
        </button>
        <button
          onClick={() => onChange('student_work')}
          className={cn(
            "relative px-6 sm:px-8 py-2.5 text-sm sm:text-base font-medium rounded-full transition-colors whitespace-nowrap",
            activeTab === 'student_work' ? "text-white" : "text-muted hover:text-ink"
          )}
        >
          {activeTab === 'student_work' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-sky-dark rounded-full"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">🎓 Học Viên</span>
        </button>
      </div>
    </div>
  )
}
