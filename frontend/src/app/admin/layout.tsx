"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuthStore()
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
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}