"use client"

import { useState, useEffect } from "react"

export const Footer = () => {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="w-full border-t border-neutral-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-neutral-500">
        <span>© {year} Ex-Bags</span>
        <span>Платформа приёма люксовых сумок</span>
      </div>
    </footer>
  )
}