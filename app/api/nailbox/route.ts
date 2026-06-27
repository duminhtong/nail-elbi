import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Elegant mock nailbox data if database is empty/not configured
const MOCK_NAILBOX_ITEMS = [
  {
    id: "nb-1",
    name: "Classic Rose Gold Almond",
    drive_file_id: "16xL7zLz3D7B1a7Wp-n1u8Hw4e60c4a60", // dummy drive file id
    // We'll use a public high-quality unsplash image as a fallback url for demonstration
    fallback_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L", "Custom"],
    forms: ["Almond", "Oval", "Coffin"],
    price: 350000,
    description: "Thiết kế French thanh lịch kết hợp cùng nhũ kim sa Rose Gold lấp lánh, mang lại vẻ đẹp cổ điển và quý phái.",
    is_custom: false
  },
  {
    id: "nb-2",
    name: "Minimalist Matcha Oval",
    drive_file_id: "27yL8zM_3E8B2b8Xq-o2v9Ix5f71d5b71",
    fallback_url: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=600&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L"],
    forms: ["Oval", "Square"],
    price: 280000,
    description: "Sự kết hợp nhẹ nhàng của sắc xanh matcha mờ cùng họa tiết vẽ tay tối giản, phù hợp cho những ngày thường nhẹ nhàng.",
    is_custom: false
  },
  {
    id: "nb-3",
    name: "Luxury Aurora Coffin",
    drive_file_id: "38zM9zN_4F9C3c9Yr-p3w0Jy6g82e6c82",
    fallback_url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L", "Custom"],
    forms: ["Coffin", "Stiletto"],
    price: 420000,
    description: "Hiệu ứng tráng gương cực quang lấp lánh đa sắc, đính đá xà cừ cao cấp. Đảm bảo thu hút mọi ánh nhìn.",
    is_custom: true
  },
  {
    id: "nb-4",
    name: "Nailbox Thiết Kế Theo Yêu Cầu (Custom)",
    drive_file_id: "custom-template",
    fallback_url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop",
    sizes: ["Custom"],
    forms: ["Almond", "Oval", "Square", "Coffin", "Stiletto"],
    price: 0,
    description: "NAIL ELBI thiết kế riêng theo ý tưởng, số đo và form móng mong muốn của riêng bạn. Hãy gửi ảnh mẫu móng bạn thích để nhận tư vấn.",
    is_custom: true
  }
]

export async function GET(request: Request) {
  try {
    const supabase = createClient()
    const { data, error } = await (supabase.from('nailbox_items') as any)
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.warn("Supabase fetch failed or table doesn't exist, falling back to mock data:", error.message)
      return NextResponse.json(MOCK_NAILBOX_ITEMS)
    }

    if (!data || data.length === 0) {
      return NextResponse.json(MOCK_NAILBOX_ITEMS)
    }

    // Map database models to display models, formatting drive URLs if they exist
    const items = data.map((item: any) => {
      const driveUrl = item.drive_file_id && item.drive_file_id !== 'custom-template'
        ? `https://lh3.googleusercontent.com/d/${item.drive_file_id}=w1000`
        : null;
      return {
        ...item,
        image_url: driveUrl || item.fallback_url || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop"
      }
    })

    return NextResponse.json(items)
  } catch (err: any) {
    console.error("NAILBOX GET ERROR:", err)
    return NextResponse.json(MOCK_NAILBOX_ITEMS)
  }
}
