"use client"

import { useRouter } from "next/navigation"
import { useApplicationStore } from "@/store"
import { ApplicationFormat } from "@/types"
import { FORMAT_LABELS, FORMAT_DESCRIPTIONS } from "@/utils"

const formats = [
  ApplicationFormat.PURCHASE,
  ApplicationFormat.TRADE_IN,
  ApplicationFormat.COMMISSION,
]

export default function HomePage() {
  const router = useRouter()
  const { setSelectedFormat } = useApplicationStore()

  const handleSelect = (format: ApplicationFormat) => {
    setSelectedFormat(format)
    router.push("/application")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-stretch">

          {/* Фото */}
          <div className="w-full">
            <img
              src="/application-types-main.png"
              alt="Luxury bag"
              className="w-full max-h-138 object-contain"
            />
          </div>

          {/* Карточки */}
          <div className="flex flex-col h-full justify-between py-8 gap-y-5">
            {formats.map((format) => (
              <button
                key={format}
                onClick={() => handleSelect(format)}
                className="flex flex-col text-left gap-2.5 pt-6 pr-4 pl-7.5 pb-7.5 border border-neutral-300 hover:border-[#6C6C6C] rounded-[14px] transition-colors"
              >
                <span className="text-sm font-semibold text-neutral-900">
                  {FORMAT_LABELS[format]}
                </span>
                <span className="text-sm text-neutral-500 leading-relaxed">
                  {FORMAT_DESCRIPTIONS[format]}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}