'use client'

import PageContainer from '@/components/layout/PageContainer'
import SectionTitle from '@/components/layout/SectionTitle'
import { useNailbox, NailboxItem } from '@/lib/hooks/useNailbox'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Ruler, Palette, Sparkles, MessageCircle } from 'lucide-react'
import SizingGuide from '@/components/nailbox/SizingGuide'

export default function NailboxPage() {
  const { items, isLoading } = useNailbox()

  const scrollToSizing = () => {
    const el = document.getElementById('sizing-guide')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'Liên hệ báo giá'
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  const getZaloOrderLink = (item: NailboxItem) => {
    const text = `Chào Nail Elbi, tôi muốn đặt mua mẫu Nailbox:\n- Mẫu: ${item.name}\n- Phom móng: ${item.forms.join(', ')}\n- Giá: ${formatPrice(item.price)}`
    return `https://zalo.me/0901292729?text=${encodeURIComponent(text)}`
  }

  return (
    <PageContainer>
      <SectionTitle 
        title="NAILBOX BY ELBI" 
        subtitle="Bộ sưu tập móng úp thiết kế riêng chuẩn salon - Đẹp xuất sắc sau 5 phút"
      />

      {/* Banner / Intro */}
      <div className="mb-20 bg-espresso-raised/30 border border-espresso-line/10 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h3 className="font-display text-2xl md:text-3xl font-light text-rose uppercase tracking-tight">
            Nailbox Thiết Kế Cao Cấp
          </h3>
          <p className="text-sm text-rose-muted font-light leading-relaxed">
            Thay vì tốn hàng giờ ngồi tại salon, Nailbox của NAIL ELBI được sơn vẽ thủ công chi tiết bởi những thợ nail lành nghề nhất. Sử dụng chất liệu sơn gel chuyên nghiệp, bền màu, đính đá chắc chắn giúp bạn tỏa sáng mọi lúc mọi nơi chỉ sau 5 phút dán móng.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-rose">
              <Sparkles size={14} className="text-rose" /> Sơn vẽ thủ công 100%
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-rose">
              <Palette size={14} className="text-rose" /> Tùy chỉnh form & size
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-rose">
              <Ruler size={14} className="text-rose" /> Hướng dẫn tự đo size chính xác
            </div>
          </div>
          <div>
            <Button 
              onClick={scrollToSizing}
              className="bg-charcoal hover:bg-ink text-white font-bold h-12 px-8 rounded-lg shadow-none text-xs tracking-wider uppercase"
            >
              Đo Size Tay Ngay
            </Button>
          </div>
        </div>
        <div className="w-full md:w-2/5 aspect-[4/3] rounded-xl overflow-hidden shadow-none border border-espresso-line/10">
          <img 
            src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop" 
            alt="Nailbox banner representation" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Nailbox Items Section */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-12 max-w-5xl mx-auto border-b border-espresso-line/10 pb-4">
          <h3 className="font-display text-xl font-medium text-rose uppercase tracking-wider">CÁC MẪU THIẾT KẾ</h3>
          <span className="text-xs text-rose-muted font-light uppercase tracking-widest">{items?.length || 0} Thiết kế</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[480px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {items?.map((item) => (
              <Card key={item.id} className="h-full border border-espresso-line/10 p-0 shadow-none hover:shadow-none transition-all duration-500 rounded-2xl bg-espresso-panel flex flex-col overflow-hidden group">
                {/* Image Showcase */}
                <div className="aspect-[4/3] relative overflow-hidden shrink-0 bg-espresso-panel">
                  <img 
                    src={item.image_url || item.fallback_url} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {item.is_custom && (
                    <div className="absolute top-6 left-6 bg-rose/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white shadow-none">
                      Custom Thiết Kế
                    </div>
                  )}
                </div>

                <CardContent className="p-8 flex-1 flex flex-col">
                  {/* Name and Price */}
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h4 className="font-display text-lg font-medium text-rose group-hover:text-rose transition-colors line-clamp-1 leading-tight tracking-tight uppercase">
                      {item.name}
                    </h4>
                  </div>
                  
                  <p className="text-base font-medium text-rose mb-4">
                    {formatPrice(item.price)}
                  </p>

                  {/* Description */}
                  <p className="text-rose-muted text-xs line-clamp-3 mb-6 leading-relaxed font-light flex-1">
                    {item.description || 'Sản phẩm Nailbox được làm thủ công bằng lớp sơn gel chất lượng cao nhất, sang xịn và bền lâu.'}
                  </p>

                  {/* Form & Size Specifications */}
                  <div className="space-y-3 mb-8 border-t border-espresso-line/10 pt-4 text-xs font-light text-rose-muted">
                    <div className="flex justify-between">
                      <span className="uppercase tracking-wider">Sizes sẵn có:</span>
                      <span className="font-medium text-rose">{item.sizes.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="uppercase tracking-wider">Forms hỗ trợ:</span>
                      <span className="font-medium text-rose">{item.forms.join(', ')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Button 
                      variant="outline"
                      onClick={scrollToSizing}
                      className="border-espresso-line/20 text-rose text-[10px] font-bold h-10 uppercase tracking-wider rounded-lg"
                    >
                      Đo Size Tay
                    </Button>
                    <Button 
                      asChild
                      className="bg-charcoal hover:bg-ink text-white text-[10px] font-bold h-10 uppercase tracking-wider rounded-lg"
                    >
                      <a href={getZaloOrderLink(item)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                        <MessageCircle size={12} /> Đặt Hàng
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Sizing and Custom Hand-Upload Measurement Guide */}
      <SizingGuide />
    </PageContainer>
  )
}
