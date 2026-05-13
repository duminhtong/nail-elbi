import { Search } from 'lucide-react'

export default function SearchBar({ 
  value, 
  onChange 
}: { 
  value: string, 
  onChange: (v: string) => void 
}) {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-20 group">
      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted group-focus-within:text-rose transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-6 py-6 border-b-2 border-border-soft/20 bg-transparent placeholder:text-muted/30 focus:outline-none focus:border-rose transition-all text-2xl font-light tracking-tight text-ink"
        placeholder="BẠN ĐANG TÌM KIẾM ĐIỀU GÌ?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
