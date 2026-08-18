import type { Metadata } from 'next'
import GelXWorkshopClient from './GelXWorkshopClient'

export const metadata: Metadata = {
  title: 'Workshop Gel X 1 Ngày | Nail Elbi',
  description: 'Workshop Gel X thực chiến salon – học 1 ngày, ứng dụng được ngay tại salon. Người hướng dẫn: Kim Ngân Lê.',
  alternates: { canonical: 'https://nailelbi.com/gel-x-workshop' },
  openGraph: {
    title: 'Workshop Gel X 1 Ngày | Nail Elbi',
    description: 'Học Gel X thực chiến trong 1 ngày – học xong ứng dụng được salon.',
    url: 'https://nailelbi.com/gel-x-workshop',
    images: [{ url: '/gel-x-workshop/gel-x-01.jpeg', width: 1200, height: 1500, alt: 'Kỹ thuật Gel X tại workshop Nail Elbi' }],
  },
}

export default function GelXWorkshopPage() {
  return <GelXWorkshopClient />
}
