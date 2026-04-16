import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MessengerChat from "@/components/layout/MessengerChat";
import { Toaster } from "@/components/ui/toaster";

const newsreader = Newsreader({ 
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "NAIL ELBI",
    template: "%s | NAIL ELBI",
  },
  description: "Nail art catalogue, khóa học nail chuyên nghiệp và video hướng dẫn miễn phí từ NAIL ELBI.",
  openGraph: {
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${newsreader.variable} ${manrope.variable} font-body text-ink antialiased`}>
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
        </div>
        
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <BottomNav />
        </div>
        <Toaster />
        <MessengerChat />
      </body>
    </html>
  );
}
