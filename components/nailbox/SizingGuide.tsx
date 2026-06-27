'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Check, AlertCircle, RefreshCw, Star, Info, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const NAIL_FORMS = [
  {
    name: 'Almond (Hạnh Nhân)',
    description: 'Thanh lịch, giúp ngón tay trông dài và thon gọn hơn. Rất phổ biến.',
    features: 'Đầu móng bầu tròn vừa phải, cạnh thuôn.'
  },
  {
    name: 'Oval (Bầu Tròn)',
    description: 'Tự nhiên, nhẹ nhàng, thích hợp cho mọi hoạt động hàng ngày.',
    features: 'Cạnh cong mềm mại theo phom móng tự nhiên.'
  },
  {
    name: 'Coffin (Quan Tài / Thang)',
    description: 'Hiện đại, cá tính, thích hợp cho móng dài vừa đến dài.',
    features: 'Cạnh thuôn dài nhưng đầu móng phẳng, vuông góc.'
  },
  {
    name: 'Square (Vuông)',
    description: 'Cổ điển, khỏe khoắn, thích hợp với phom móng ngắn hoặc trung bình.',
    features: 'Cạnh thẳng đứng, đầu móng phẳng phẳng vuông góc.'
  },
  {
    name: 'Stiletto (Nhọn)',
    description: 'Táo bạo, thời thượng, dành cho những thiết kế phá cách ấn tượng.',
    features: 'Cạnh thuôn sắc nhọn về một điểm ở đầu móng.'
  }
]

export default function SizingGuide() {
  const [selectedForm, setSelectedForm] = useState<string>('Almond (Hạnh Nhân)')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "Ảnh quá lớn",
          description: "Vui lòng chọn ảnh dưới 10MB để hệ thống xử lý.",
          variant: "destructive"
        })
        return
      }
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
      setUploadedUrl(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/nailbox/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload error')

      setUploadedUrl(data.publicUrl)
      toast({
        title: "Tải lên thành công!",
        description: "Ảnh đo size tay của bạn đã được tải lên máy chủ.",
      })
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Lỗi tải ảnh lên",
        description: error.message || "Đã xảy ra lỗi kết nối, vui lòng thử lại.",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreviewUrl(null)
    setUploadedUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const getZaloShareLink = () => {
    const text = `Chào Nail Elbi, tôi muốn đặt làm custom Nailbox:\n- Form móng: ${selectedForm}\n- Ảnh đo tay: ${uploadedUrl || 'Chưa tải lên'}`
    const encodedText = encodeURIComponent(text)
    return `https://zalo.me/0901292729?text=${encodedText}`
  }

  return (
    <section id="sizing-guide" className="py-16 md:py-24 border-t border-border-soft/10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-rose uppercase bg-rose/5 px-4 py-1.5 rounded-full">HƯỚNG DẪN</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-ink mt-4 uppercase tracking-tight">
            Đo Size & Chọn Form Móng
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto mt-4 font-light leading-relaxed">
            Sở hữu bộ Nailbox thiết kế riêng khớp hoàn hảo với phom móng tự nhiên của bạn chỉ trong vài bước đơn giản.
          </p>
        </div>

        {/* Step 1: Select Form */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center font-display text-sm">1</span>
            <h3 className="font-display text-xl font-medium text-ink uppercase tracking-wider">CHỌN FORM MÓNG BẠN THÍCH</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NAIL_FORMS.map((form) => (
              <div 
                key={form.name}
                onClick={() => setSelectedForm(form.name)}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedForm === form.name 
                    ? 'border-rose bg-rose/[0.02] shadow-premium-sm' 
                    : 'border-border-soft/20 bg-white hover:border-muted'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-ink text-base tracking-tight">{form.name}</h4>
                  {selectedForm === form.name && (
                    <span className="w-5 h-5 rounded-full bg-rose text-white flex items-center justify-center shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted font-light leading-relaxed mb-2">{form.description}</p>
                <p className="text-[10px] text-ink/60 font-light italic">
                  <span className="font-bold text-rose/80 not-italic mr-1">Đặc điểm:</span> {form.features}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Instructions */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center font-display text-sm">2</span>
            <h3 className="font-display text-xl font-medium text-ink uppercase tracking-wider">HƯỚNG DẪN CHỤP ẢNH ĐO SIZE</h3>
          </div>

          <div className="bg-neu/20 border border-border-soft/10 rounded-xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-rose/10 text-rose flex items-center justify-center text-xs shrink-0 font-bold">A</div>
                  <div>
                    <h5 className="font-medium text-ink text-sm uppercase tracking-wider mb-1">Chuẩn bị vật mẫu quy đổi</h5>
                    <p className="text-xs text-muted font-light leading-relaxed">
                      Đặt 1 chiếc thẻ ATM/thẻ CCCD cũ, thước kẻ hoặc một đồng xu cạnh bàn tay của bạn để hệ thống nhận diện tỷ lệ quy đổi chính xác.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-rose/10 text-rose flex items-center justify-center text-xs shrink-0 font-bold">B</div>
                  <div>
                    <h5 className="font-medium text-ink text-sm uppercase tracking-wider mb-1">Đặt bàn tay phẳng</h5>
                    <p className="text-xs text-muted font-light leading-relaxed">
                      Đặt tay áp sát thẳng trên mặt bàn phẳng sáng màu (sạch sẽ), xòe các ngón tay tự nhiên, không khum tay hay gập ngón tay.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-rose/10 text-rose flex items-center justify-center text-xs shrink-0 font-bold">C</div>
                  <div>
                    <h5 className="font-medium text-ink text-sm uppercase tracking-wider mb-1">Chụp ảnh góc 90 độ</h5>
                    <p className="text-xs text-muted font-light leading-relaxed">
                      Đưa camera điện thoại song song trực diện chính giữa bàn tay (góc 90 độ từ trên xuống), đảm bảo ảnh rõ nét và không bị lóa sáng hay bóng mờ.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-dashed border-border-soft/30 rounded-lg p-6 bg-white flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 border border-rose/20 rounded-full flex items-center justify-center bg-rose/[0.01] mb-4">
                  <Star className="w-16 h-16 text-rose/30 fill-rose/[0.02]" />
                </div>
                <h6 className="text-xs font-semibold text-ink uppercase tracking-widest mb-1">Ảnh chụp chuẩn xác</h6>
                <p className="text-[10px] text-muted font-light max-w-xs leading-normal">
                  Chụp đủ toàn bộ bàn tay kèm thước/vật quy chiếu nằm ngay sát cạnh bàn tay trên cùng một mặt phẳng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Photo Upload and Send Request */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center font-display text-sm">3</span>
            <h3 className="font-display text-xl font-medium text-ink uppercase tracking-wider">TẢI ẢNH LÊN & GỬI YÊU CẦU</h3>
          </div>

          <div className="bg-white border border-border-soft/10 rounded-xl p-8 shadow-premium-sm">
            <div className="flex flex-col items-center">
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <AnimatePresence mode="wait">
                {!previewUrl ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-16 border-2 border-dashed border-border-soft/30 hover:border-rose rounded-xl bg-neu/[0.05] cursor-pointer flex flex-col items-center justify-center group transition-colors duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-neu-dark/10 flex items-center justify-center text-muted group-hover:bg-rose group-hover:text-white transition-all duration-300 mb-4">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-medium text-ink">Bấm vào đây để chọn ảnh chụp tay</p>
                    <p className="text-xs text-muted font-light mt-2">Hỗ trợ định dạng JPG, PNG hoặc HEIC lên tới 10MB</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Visual Preview Container with helper alignment guide overlay */}
                    <div className="relative max-w-md w-full aspect-[4/3] rounded-xl overflow-hidden border border-border-soft/20 bg-neu flex items-center justify-center">
                      <img 
                        src={previewUrl} 
                        alt="Hand preview" 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Interactive Guideline Overlay */}
                      <div className="absolute inset-0 border border-rose/30 pointer-events-none flex flex-col justify-between p-4">
                        <div className="w-full flex justify-between">
                          <span className="w-4 h-4 border-t border-l border-rose/70"></span>
                          <span className="w-4 h-4 border-t border-r border-rose/70"></span>
                        </div>
                        
                        <div className="text-center bg-black/40 backdrop-blur-sm py-1 px-3 rounded-full text-[9px] font-bold text-white uppercase tracking-widest mx-auto flex items-center gap-1.5">
                          <Info size={10} className="text-rose" /> Khung căn tỷ lệ thước kẻ / vật mẫu
                        </div>

                        <div className="w-full flex justify-between">
                          <span className="w-4 h-4 border-b border-l border-rose/70"></span>
                          <span className="w-4 h-4 border-b border-r border-rose/70"></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                      {!uploadedUrl ? (
                        <Button 
                          onClick={handleUpload}
                          disabled={uploading}
                          className="bg-charcoal hover:bg-ink text-white font-bold h-12 px-8 rounded-lg shadow-premium text-xs tracking-wider uppercase"
                        >
                          {uploading ? (
                            <>
                              <RefreshCw size={14} className="animate-spin mr-2" /> Đang tải lên...
                            </>
                          ) : (
                            <>Xác nhận tải ảnh lên máy chủ</>
                          )}
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs px-4 py-2.5 rounded-lg border border-emerald-200 font-medium">
                          <Check size={14} /> Ảnh đã được tải lên và tạo liên kết thành công!
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        onClick={handleReset}
                        disabled={uploading}
                        className="h-12 border-border-soft/20 text-ink text-xs font-bold px-6 rounded-lg uppercase tracking-wider"
                      >
                        Chọn ảnh khác
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 4: Finalize & Zalo/Messenger redirect */}
              <AnimatePresence>
                {selectedForm && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full mt-10 border-t border-border-soft/10 pt-8"
                  >
                    <h5 className="font-bold text-xs uppercase tracking-widest text-ink mb-6 text-center">Tóm tắt yêu cầu của bạn:</h5>
                    <div className="flex flex-col sm:flex-row justify-between items-center p-5 rounded-lg bg-neu/10 border border-border-soft/10 mb-8 gap-4">
                      <div className="text-center sm:text-left">
                        <p className="text-xs text-muted font-light uppercase tracking-widest">Phom móng lựa chọn</p>
                        <p className="text-base font-semibold text-ink mt-1">{selectedForm}</p>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-xs text-muted font-light uppercase tracking-widest">Ảnh kích thước tay</p>
                        <p className="text-sm font-semibold mt-1">
                          {uploadedUrl ? (
                            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-rose hover:underline font-bold">
                              [Xem ảnh đã tải lên máy chủ]
                            </a>
                          ) : (
                            <span className="text-rose font-light italic">Vui lòng tải ảnh lên trước</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Button 
                        asChild 
                        disabled={!uploadedUrl}
                        className={`w-full sm:w-auto h-14 px-10 rounded-xl font-bold tracking-widest text-xs uppercase shadow-premium transition-all duration-300 ${
                          uploadedUrl 
                            ? 'bg-rose hover:bg-rose-dark text-white cursor-pointer' 
                            : 'bg-muted text-muted/60 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {uploadedUrl ? (
                          <a href={getZaloShareLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                            <MessageSquare size={16} /> Gửi yêu cầu đo size qua ZALO
                          </a>
                        ) : (
                          <span className="flex items-center justify-center gap-3">
                            <MessageSquare size={16} /> Gửi yêu cầu đo size qua ZALO
                          </span>
                        )}
                      </Button>
                      <p className="text-[10px] text-muted font-light mt-3 text-center max-w-sm leading-normal">
                        * Bấm gửi sẽ mở Zalo của Nail Elbi và tự động điền yêu cầu kèm liên kết ảnh đo size tay của bạn.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
