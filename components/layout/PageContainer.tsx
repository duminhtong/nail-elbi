export default function PageContainer({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <main className={`mx-auto w-full max-w-7xl flex-1 px-4 py-10 pb-28 sm:px-6 md:py-16 md:pb-16 lg:px-8 ${className}`}>{children}</main>
}
