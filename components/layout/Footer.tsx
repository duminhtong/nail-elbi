'use client'

import Link from 'next/link'
import { MapPin, Phone, MessageCircle, MessageSquare } from 'lucide-react'

// Custom Facebook SVG since lucide-react version might not support it
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export default function Footer() {
  const zaloUrl = "http://zalo.me/0901292729"
  const hotline = "0901292729"

  return (
    <footer className="bg-white pt-24 pb-32 md:pb-24 border-t border-border-soft/30 mt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {/* Brand & Introduction */}
          <div className="space-y-8">
            <h3 className="font-display text-4xl font-light text-ink tracking-tighter">ELBI <span className="font-black text-rose">BEAUTY</span></h3>
            <p className="text-muted text-base leading-relaxed max-w-sm font-light">
              Nơi khởi nguồn cái đẹp và sự chuyên nghiệp. Chuyên Nail Design, Brow Lamination, Lash Lift và Đào tạo chuyên gia thẩm mỹ hàng đầu.
            </p>
            <div className="flex items-center gap-4">
              <a href={zaloUrl} target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full bg-neu-dark/10 text-charcoal hover:bg-rose/10 hover:text-rose transition-all shadow-premium-sm" title="Zalo">
                <MessageCircle size={20} />
              </a>
              <a href="https://facebook.com/nailelbi" target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full bg-neu-dark/10 text-charcoal hover:bg-rose/10 hover:text-rose transition-all shadow-premium-sm" title="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href={`tel:${hotline}`} className="w-12 h-12 flex items-center justify-center rounded-full bg-neu-dark/10 text-charcoal hover:bg-rose/10 hover:text-rose transition-all shadow-premium-sm" title="Gọi ngay">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-10">
            <h4 className="font-semibold text-ink uppercase tracking-[0.2em] text-xs">Hệ thống chi nhánh</h4>
            <div className="space-y-8">
              <div className="group border-l-2 border-rose/10 pl-6 hover:border-rose transition-all">
                <p className="font-bold text-ink text-sm">ELBI ACADEMY & SPA</p>
                <p className="text-muted text-sm mt-2 font-light">
                  32 Lê Quý Đôn, An Bình, Rạch Giá, Kiên Giang
                </p>
              </div>
              <div className="group border-l-2 border-rose/10 pl-6 hover:border-rose transition-all">
                <p className="font-bold text-ink text-sm">ELBI DESIGN STUDIO</p>
                <p className="text-muted text-sm mt-2 font-light">
                  90 Phạm Hùng, Vĩnh Bảo, Rạch Giá, Kiên Giang
                </p>
              </div>
            </div>
          </div>

          {/* Fast Contact */}
          <div className="space-y-10">
            <h4 className="font-semibold text-ink uppercase tracking-[0.2em] text-xs">Liên hệ trực tiếp</h4>
            <div className="space-y-8">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-neu shadow-premium-sm border border-white/50">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-rose">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase font-bold tracking-widest">Hotline 24/7</p>
                  <a href={`tel:${hotline}`} className="text-2xl font-light text-ink hover:text-rose transition-colors">
                    {hotline}
                  </a>
                </div>
              </div>
              <Link 
                href={zaloUrl} 
                className="inline-flex items-center justify-center w-full bg-charcoal-dark text-white py-5 rounded-xl font-bold tracking-widest text-sm shadow-premium hover:bg-ink transition-all active:scale-[0.98]"
              >
                ĐẶT LỊCH HẸN NGAY
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-border-soft/20 text-center">
          <p className="text-muted/60 text-xs font-light tracking-widest">
            © {new Date().getFullYear()} ELBI BEAUTY. Design with Premium Minimalism.
          </p>
        </div>
      </div>
    </footer>
  )
}
