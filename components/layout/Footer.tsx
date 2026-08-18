'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Phone, MessageCircle, MessageSquare } from 'lucide-react'

// Custom Facebook SVG since lucide-react version might not support it
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/gel-x-workshop') return null

  const zaloUrl = "http://zalo.me/0901292729"
  const hotline = "0901292729"

  return (
    <footer className="mt-24 border-t border-espresso-line bg-espresso-dark pt-20 pb-32 text-rose md:pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {/* Brand & Introduction */}
          <div className="space-y-8">
            <h3 className="font-display text-3xl font-light text-rose tracking-tighter">ELBI <span className="font-black text-rose-dark">BEAUTY</span></h3>
            <p className="text-rose-muted text-base leading-relaxed max-w-sm font-light">
              Nơi khởi nguồn cái đẹp và sự chuyên nghiệp. Chuyên Nail Design, Brow Lamination, Lash Lift và Đào tạo chuyên gia thẩm mỹ hàng đầu.
            </p>
            <div className="flex items-center gap-4">
              <a href={zaloUrl} target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full border border-espresso-line text-rose-muted hover:border-red hover:text-rose transition-all shadow-none" title="Zalo">
                <MessageCircle size={20} />
              </a>
              <a href="https://facebook.com/nailelbi" target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full border border-espresso-line text-rose-muted hover:border-red hover:text-rose transition-all shadow-none" title="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href={`tel:${hotline}`} className="w-12 h-12 flex items-center justify-center rounded-full border border-espresso-line text-rose-muted hover:border-red hover:text-rose transition-all shadow-none" title="Gọi ngay">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-10">
            <h4 className="font-semibold text-rose uppercase tracking-[0.2em] text-xs">Hệ thống chi nhánh</h4>
            <div className="space-y-8">
              <div className="group border-l-2 border-espresso-line pl-6 hover:border-red transition-all">
                <p className="font-bold text-rose text-sm">ELBI ACADEMY & SPA</p>
                <p className="text-rose-muted text-sm mt-2 font-light">
                  32 Lê Quý Đôn, An Bình, Rạch Giá, Kiên Giang
                </p>
              </div>
              <div className="group border-l-2 border-espresso-line pl-6 hover:border-red transition-all">
                <p className="font-bold text-rose text-sm">ELBI DESIGN STUDIO</p>
                <p className="text-rose-muted text-sm mt-2 font-light">
                  90 Phạm Hùng, Vĩnh Bảo, Rạch Giá, Kiên Giang
                </p>
              </div>
            </div>
          </div>

          {/* Fast Contact */}
          <div className="space-y-10">
            <h4 className="font-semibold text-rose uppercase tracking-[0.2em] text-xs">Liên hệ trực tiếp</h4>
            <div className="space-y-8">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-espresso-panel border border-espresso-line">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-espresso-raised text-rose">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-rose-muted uppercase font-bold tracking-widest">Hotline 24/7</p>
                  <a href={`tel:${hotline}`} className="text-2xl font-light text-rose hover:text-rose-light transition-colors">
                    {hotline}
                  </a>
                </div>
              </div>
              <Link 
                href={zaloUrl} 
                className="inline-flex items-center justify-center w-full bg-red text-rose-light py-5 rounded-xl font-bold tracking-widest text-sm shadow-none hover:bg-espresso-raised transition-all active:scale-[0.98]"
              >
                ĐẶT LỊCH HẸN NGAY
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-espresso-line text-center">
          <p className="text-rose-muted/60 text-xs font-light tracking-widest">
            © {new Date().getFullYear()} ELBI BEAUTY. Design with Premium Minimalism.
          </p>
        </div>
      </div>
    </footer>
  )
}
