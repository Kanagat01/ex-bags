import type { Metadata } from "next"
import { Header } from "@/components/shared"
import { Footer } from "@/components/shared"
import "./globals.css"

export const metadata: Metadata = {
  title: "(ex)bags - ресейл платформа люксовых сумок и аксессуаров",
  description: "Выкуп, Trade-In и реализация дизайнерских сумок",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}