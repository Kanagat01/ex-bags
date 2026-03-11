"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getApplications } from "@/api"
import { Application, ApplicationStatus, ApplicationFormat } from "@/types"
import { useApplicationStore } from "@/store"
import { StatusBadge } from "@/components/ui"
import { PageLoader, ErrorMessage } from "@/components/shared"
import { FORMAT_LABELS, formatPrice, formatDateTime } from "@/utils"

const statusOptions = [
  { value: "", label: "Все статусы" },
  { value: ApplicationStatus.NEW, label: "Новые" },
  { value: ApplicationStatus.OFFER_SENT, label: "Предложение отправлено" },
  { value: ApplicationStatus.ACCEPTED, label: "Принято" },
  { value: ApplicationStatus.DECLINED, label: "Отказано" },
  { value: ApplicationStatus.CONTRACT_SIGNED, label: "Договор подписан" },
]

const formatOptions = [
  { value: "", label: "Все форматы" },
  { value: ApplicationFormat.PURCHASE, label: FORMAT_LABELS[ApplicationFormat.PURCHASE] },
  { value: ApplicationFormat.TRADE_IN, label: FORMAT_LABELS[ApplicationFormat.TRADE_IN] },
  { value: ApplicationFormat.COMMISSION, label: FORMAT_LABELS[ApplicationFormat.COMMISSION] },
]

export default function AdminApplicationsPage() {
  const { filters, setFilter, resetFilters, setApplications, applications } =
    useApplicationStore()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApplications = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getApplications({
        status: filters.status || undefined,
        format: filters.format || undefined,
        date_from: filters.date_from || undefined,
        date_to: filters.date_to || undefined,
      })
      setApplications(data)
    } catch {
      setError("Не удалось загрузить заявки")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [filters])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Заявки</h1>
        <span className="text-sm text-neutral-500">{applications.length} заявок</span>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">Статус</label>
          <select
            value={filters.status}
            onChange={(e) => setFilter("status", e.target.value)}
            className="border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black"
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">Формат</label>
          <select
            value={filters.format}
            onChange={(e) => setFilter("format", e.target.value)}
            className="border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black"
          >
            {formatOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">С</label>
          <input
            type="date"
            value={filters.date_from}
            onChange={(e) => setFilter("date_from", e.target.value)}
            className="border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-500">По</label>
          <input
            type="date"
            value={filters.date_to}
            onChange={(e) => setFilter("date_to", e.target.value)}
            className="border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        <button
          onClick={resetFilters}
          className="text-sm text-neutral-500 underline hover:text-black transition-colors pb-2"
        >
          Сбросить
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <PageLoader />
      ) : applications.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-neutral-400 text-sm">
          Заявок не найдено
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-neutral-500">
                <th className="pb-3 pr-4 font-medium">Товар</th>
                <th className="pb-3 pr-4 font-medium">Формат</th>
                <th className="pb-3 pr-4 font-medium">Телефон</th>
                <th className="pb-3 pr-4 font-medium">Желаемая цена</th>
                <th className="pb-3 pr-4 font-medium">Предложена</th>
                <th className="pb-3 pr-4 font-medium">Статус</th>
                <th className="pb-3 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: Application) => (
                <tr
                  key={app.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="font-medium hover:underline"
                    >
                      {app.brand} {app.model}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-neutral-500">
                    {FORMAT_LABELS[app.format]}
                  </td>
                  <td className="py-3 pr-4 text-neutral-500">{app.phone}</td>
                  <td className="py-3 pr-4">{formatPrice(app.desired_price)}</td>
                  <td className="py-3 pr-4">
                    {app.offered_price ? formatPrice(app.offered_price) : "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="py-3 text-neutral-500 whitespace-nowrap">
                    {formatDateTime(app.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}