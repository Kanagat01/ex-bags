"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useForm, SubmitHandler, Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  getApplication,
  approveApplication,
  rejectApplication,
  getAdminContractUrl
} from "@/api"
import { Application, ApplicationStatus } from "@/types"
import { Button, Input, Modal, StatusBadge } from "@/components/ui"
import { PhotoGallery, PageLoader, ErrorMessage } from "@/components/shared"
import {
  FORMAT_LABELS,
  CONDITION_LABELS,
  formatPrice,
  formatDateTime,
  formatPhone,
} from "@/utils"

const approveSchema = z.object({
  offered_price: z.coerce.number().positive("Укажите сумму"),
})

const rejectSchema = z.object({
  rejection_reason: z.string().min(1, "Укажите причину"),
})

type ApproveForm = z.infer<typeof approveSchema>
type RejectForm = z.infer<typeof rejectSchema>

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>()

  const [application, setApplication] = useState<Application | null>(null)
  const [contractUrl, setContractUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const approveForm = useForm<ApproveForm>({
    resolver: zodResolver(approveSchema) as Resolver<ApproveForm>,
  })

  const rejectForm = useForm<RejectForm>({
    resolver: zodResolver(rejectSchema) as Resolver<RejectForm>,
  })

  const fetchApplication = async () => {
    try {
      const data = await getApplication(id)
      setApplication(data)

      if (
      data.status === ApplicationStatus.ACCEPTED ||
      data.status === ApplicationStatus.CONTRACT_SIGNED
    ) {
      try {
        const { url } = await getAdminContractUrl(id)
        setContractUrl(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
      } catch {
        // договор ещё не сгенерирован — не критично
      }
    }
    } catch {
      setError("Заявка не найдена")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApplication()
  }, [id])

  const handleApprove: SubmitHandler<ApproveForm> = async (data) => {
    setActionError(null)
    try {
      await approveApplication(id, data)
      setIsApproveOpen(false)
      await fetchApplication()
    } catch (e: unknown) {
      const err = e as { response?: { data?: { detail?: string } } }
      setActionError(err.response?.data?.detail ?? "Ошибка")
    }
  }

  const handleReject: SubmitHandler<RejectForm> = async (data) => {
    setActionError(null)
    try {
      await rejectApplication(id, data)
      setIsRejectOpen(false)
      await fetchApplication()
    } catch (e: unknown) {
      const err = e as { response?: { data?: { detail?: string } } }
      setActionError(err.response?.data?.detail ?? "Ошибка")
    }
  }

  if (isLoading) return <PageLoader />
  if (error || !application) return <ErrorMessage message={error ?? "Ошибка"} />

  const canApproveOrReject = application.status === ApplicationStatus.NEW
  const canDownload = application.status === ApplicationStatus.CONTRACT_SIGNED

  return (
    <div className="flex flex-col gap-8">
      {/* Шапка */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">
            {application.brand} {application.model}
          </h1>
          <p className="text-sm text-neutral-500">
            {FORMAT_LABELS[application.format]} · {formatDateTime(application.created_at)}
          </p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Левая колонка */}
        <div className="flex flex-col gap-6">
          <PhotoGallery photos={application.photos} />

          {/* Данные товара */}
          <div className="flex flex-col gap-3 border border-neutral-200 p-5">
            <h2 className="font-medium">Данные товара</h2>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-neutral-500">Бренд</span>
              <span>{application.brand}</span>
              <span className="text-neutral-500">Модель</span>
              <span>{application.model}</span>
              {application.size && (
                <>
                  <span className="text-neutral-500">Размер</span>
                  <span>{application.size}</span>
                </>
              )}
              <span className="text-neutral-500">Состояние</span>
              <span>{CONDITION_LABELS[application.condition]}</span>
              {application.defects_description && (
                <>
                  <span className="text-neutral-500">Изъяны</span>
                  <span>{application.defects_description}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="flex flex-col gap-6">
          {/* Контакты */}
          <div className="flex flex-col gap-3 border border-neutral-200 p-5">
            <h2 className="font-medium">Контакты продавца</h2>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-neutral-500">Телефон</span>
              <span>{formatPhone(application.phone)}</span>
              {application.email && (
                <>
                  <span className="text-neutral-500">Email</span>
                  <span>{application.email}</span>
                </>
              )}
            </div>
          </div>

          {/* Цены */}
          <div className="flex flex-col gap-3 border border-neutral-200 p-5">
            <h2 className="font-medium">Цены</h2>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-neutral-500">Желаемая цена</span>
              <span>{formatPrice(application.desired_price)}</span>
              {application.offered_price && (
                <>
                  <span className="text-neutral-500">Предложенная цена</span>
                  <span className="font-medium">{formatPrice(application.offered_price)}</span>
                </>
              )}
            </div>
          </div>

          {/* Действия */}
          {actionError && <ErrorMessage message={actionError} />}

          <div className="flex flex-col gap-3">
            {canApproveOrReject && (
              <>
                <Button onClick={() => setIsApproveOpen(true)} fullWidth>
                  Одобрить заявку
                </Button>
                <Button
                  variant="danger"
                  onClick={() => setIsRejectOpen(true)}
                  fullWidth
                >
                  Отклонить заявку
                </Button>
              </>
            )}

            {contractUrl && (
              <a
                href={contractUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center border border-black px-5 py-2.5 text-sm font-medium hover:bg-neutral-100 transition-colors"
              >
                {application.status === ApplicationStatus.CONTRACT_SIGNED
                  ? "Скачать подписанный договор"
                  : "Предпросмотр договора"}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Модалка одобрения */}
      <Modal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        title="Одобрить заявку"
      >
        <form
          onSubmit={approveForm.handleSubmit(handleApprove)}
          className="flex flex-col gap-4"
        >
          <Input
            label="Предлагаемая сумма (₽)"
            type="number"
            placeholder="150000"
            error={approveForm.formState.errors.offered_price?.message}
            required
            {...approveForm.register("offered_price")}
          />
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsApproveOpen(false)}
              fullWidth
            >
              Отмена
            </Button>
            <Button
              type="submit"
              isLoading={approveForm.formState.isSubmitting}
              fullWidth
            >
              Одобрить
            </Button>
          </div>
        </form>
      </Modal>

      {/* Модалка отклонения */}
      <Modal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        title="Отклонить заявку"
      >
        <form
          onSubmit={rejectForm.handleSubmit(handleReject)}
          className="flex flex-col gap-4"
        >
          <Input
            label="Причина отказа"
            placeholder="Укажите причину..."
            error={rejectForm.formState.errors.rejection_reason?.message}
            required
            {...rejectForm.register("rejection_reason")}
          />
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsRejectOpen(false)}
              fullWidth
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="danger"
              isLoading={rejectForm.formState.isSubmitting}
              fullWidth
            >
              Отклонить
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}