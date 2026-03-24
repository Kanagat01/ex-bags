"use client"

import { useState, useEffect } from "react"

export const Footer = () => {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="w-full bg-black border-t border-neutral-200 mt-auto">
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-between text-sm text-white">
        <span>(ex)bags - ресейл платформа люксовых сумок и аксессуаров</span>
        <span>© (ex)bags {year}</span>
      </div>
    </footer>
  )
}