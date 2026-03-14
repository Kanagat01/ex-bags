"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/store"
import { Button } from "@/components/ui"
import { useAuth } from "@/hooks"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuthStore()
  const { handleLogout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login")
    }
  }, [mounted, isAuthenticated, pathname, router])

  if (!mounted) return null

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-medium tracking-tight">
              Ex-Bags
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/admin/applications"
                className="text-sm text-neutral-500 hover:text-black transition-colors"
              >
                Заявки
              </Link>
            </nav>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </header>
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}