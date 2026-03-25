"use client"

import { useForm, SubmitHandler, Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/hooks"
import { Button, Input } from "@/components/ui"
import { ErrorMessage } from "@/components/shared"

const schema = z.object({
  username: z.string().min(1, "Укажите логин"),
  password: z.string().min(1, "Укажите пароль"),
})

type LoginForm = z.infer<typeof schema>

export default function LoginPage() {
  const { handleLogin } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema) as Resolver<LoginForm>,
  })

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await handleLogin(data.username, data.password)
    } catch {
      setError("root", { message: "Неверный логин или пароль" })
    }
  }

  return (
    <div className="flex items-center justify-center px-4 mt-15">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium">Вход</h1>
          <p className="text-sm text-neutral-500">Панель администратора Ex-Bags</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            label="Логин"
            placeholder="admin"
            error={errors.username?.message}
            required
            {...register("username")}
          />
          <Input
            label="Пароль"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            required
            {...register("password")}
          />

          {errors.root && <ErrorMessage message={errors.root.message ?? ""} />}

          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Войти
          </Button>
        </form>
      </div>
    </div>
  )
}