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

const formatIcons: Record<ApplicationFormat, string> = {
  [ApplicationFormat.PURCHASE]: "💰",
  [ApplicationFormat.TRADE_IN]: "🔄",
  [ApplicationFormat.COMMISSION]: "🏷️",
}

export default function HomePage() {
  const router = useRouter()
  const { setSelectedFormat } = useApplicationStore()

  const handleSelect = (format: ApplicationFormat) => {
    setSelectedFormat(format)
    router.push("/application")
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Сдать сумку</h1>
        <p className="text-neutral-500 text-sm">
          Выберите удобный для вас формат сотрудничества
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => handleSelect(format)}
            className="flex flex-col gap-3 border border-neutral-200 p-6 text-left hover:border-black transition-colors"
          >
            <span className="text-3xl">{formatIcons[format]}</span>
            <span className="font-medium">{FORMAT_LABELS[format]}</span>
            <span className="text-sm text-neutral-500">
              {FORMAT_DESCRIPTIONS[format]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}