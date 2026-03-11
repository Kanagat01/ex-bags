"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApplicationStore } from "@/store"
import { useApplicationForm } from "@/hooks"
import { Button, Input, Select, Textarea, FileUpload } from "@/components/ui"
import { ErrorMessage } from "@/components/shared"
import { FORMAT_LABELS, BRANDS, CONDITION_LABELS } from "@/utils"
import { ApplicationCondition } from "@/types"

export default function ApplicationPage() {
  const router = useRouter()
  const { selectedFormat } = useApplicationStore()
  const { form, onSubmit } = useApplicationForm()

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form

  // Если не выбран формат — редирект на главную
  useEffect(() => {
    if (!selectedFormat) router.replace("/")
  }, [selectedFormat, router])

  if (!selectedFormat) return null

  const brandOptions = BRANDS.map((b) => ({ value: b, label: b }))
  const conditionOptions = Object.values(ApplicationCondition).map((c) => ({
    value: c,
    label: CONDITION_LABELS[c],
  }))

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium">Заявка на {FORMAT_LABELS[selectedFormat]}</h1>
        <p className="text-sm text-neutral-500">
          Заполните данные о сумке и мы свяжемся с вами
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">

        {/* Данные товара */}
        <div className="flex flex-col gap-4">
          <h2 className="font-medium">Данные товара</h2>

          <Select
            label="Бренд"
            placeholder="Выберите бренд"
            options={brandOptions}
            error={errors.brand?.message}
            required
            {...register("brand")}
          />

          <Input
            label="Модель"
            placeholder="Например: Birkin 30, Classic Flap"
            error={errors.model?.message}
            required
            {...register("model")}
          />

          <Input
            label="Размер"
            placeholder="Например: 30, M"
            error={errors.size?.message}
            {...register("size")}
          />

          <Select
            label="Состояние"
            placeholder="Выберите состояние"
            options={conditionOptions}
            error={errors.condition?.message}
            required
            {...register("condition")}
          />

          <Textarea
            label="Описание изъянов"
            placeholder="Потёртости, царапины, сколы фурнитуры..."
            rows={3}
            error={errors.defects_description?.message}
            {...register("defects_description")}
          />
        </div>

        {/* Фотографии */}
        <div className="flex flex-col gap-2">
          <h2 className="font-medium">Фотографии</h2>
          <FileUpload
            onChange={(files) => setValue("photos", files, { shouldValidate: true })}
            error={errors.photos?.message}
          />
        </div>

        {/* Контакты и цена */}
        <div className="flex flex-col gap-4">
          <h2 className="font-medium">Контакты и цена</h2>

          <Input
            label="Желаемая цена"
            type="number"
            placeholder="150000"
            hint="В рублях"
            error={errors.desired_price?.message}
            required
            {...register("desired_price")}
          />

          <Input
            label="Телефон"
            type="tel"
            placeholder="+7 (999) 123-45-67"
            error={errors.phone?.message}
            required
            {...register("phone")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            hint="Необязательно — для уведомлений"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        {errors.root && <ErrorMessage message={errors.root.message ?? ""} />}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Назад
          </Button>
          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Отправить заявку
          </Button>
        </div>
      </form>
    </div>
  )
}