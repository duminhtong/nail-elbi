import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thông Tin Khóa Học',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
