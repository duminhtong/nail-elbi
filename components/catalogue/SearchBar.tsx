import { Search } from 'lucide-react'

export default function SearchBar({ 
  value, 
  onChange 
}: { 
  value: string, 
  onChange: (v: string) => void 
}) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-border-soft rounded-full leading-5 bg-white placeholder-muted focus:outline-none focus:ring-1 focus:ring-rose focus:border-rose sm:text-sm shadow-sm transition-all text-base"
        placeholder="Tìm kiếm mẫu nail..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
