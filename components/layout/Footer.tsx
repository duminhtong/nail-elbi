'use client'

import Link from 'next/link'
import { MapPin, Phone, Facebook, MessageCircle, MessageSquare } from 'lucide-react'

export default function Footer() {
  const zaloUrl = "http://zalo.me/0901292729"
  const hotline = "0901292729"

  return (
    <footer className="bg-white border-t border-border-soft pt-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand & Introduction */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-ink tracking-tight">ELBI BEAUTY</h3>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Chuyên Nail Design, Brow Lamination, Lash Lift và Đào tạo học viên chuyên nghiệp tại Rạch Giá, Kiên Giang. 
              Mang lại vẻ đẹp hoàn hảo và sự tự tin cho phái đẹp.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href={zaloUrl} target="_blank" className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Zalo">
                <MessageCircle size={20} />
              </a>
              <a href="https://facebook.com/nailelbi" target="_blank" className="p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href={`tel:${hotline}`} className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Gọi ngay">
                <Phone size={20} />
              </a>
              <a href={`sms:${hotline}`} className="p-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors" title="Gửi Tin nhắn (SMS)">
                <MessageSquare size={20} />
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-6">
            <h4 className="font-bold text-ink uppercase tracking-wider text-sm flex items-center gap-2">
              <MapPin size={16} className="text-rose" /> Hệ thống Chi nhánh
            </h4>
            <div className="space-y-4">
              <div className="group">
                <p className="font-semibold text-ink group-hover:text-rose transition-colors">Chi nhánh 1</p>
                <p className="text-muted text-sm mt-1 prose-sm">
                  32 Lê Quý Đôn, An Bình, Rạch Giá, Kiên Giang
                </p>
              </div>
              <div className="group">
                <p className="font-semibold text-ink group-hover:text-rose transition-colors">Chi nhánh 2</p>
                <p className="text-muted text-sm mt-1 prose-sm">
                  90 Phạm Hùng, Vĩnh Bảo, Rạch Giá, Kiên Giang
                </p>
              </div>
            </div>
          </div>

          {/* Fast Contact */}
          <div className="space-y-6">
            <h4 className="font-bold text-ink uppercase tracking-wider text-sm">Liên hệ nhanh</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-rose/10 text-rose">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase font-bold tracking-tight">Hotline / Zalo</p>
                  <a href={`tel:${hotline}`} className="text-lg font-bold text-ink hover:text-rose transition-colors">
                    {hotline}
                  </a>
                </div>
              </div>
              <Link 
                href={zaloUrl} 
                className="inline-flex items-center justify-center w-full bg-ink text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95"
              >
                Nhận tư vấn qua Zalo
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border-soft mt-12 pt-8 text-center">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} ELBI BEAUTY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
