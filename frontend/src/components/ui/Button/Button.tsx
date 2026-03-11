import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const base = "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary: "bg-white text-black border border-black hover:bg-neutral-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-black hover:bg-neutral-100",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const width = fullWidth ? "w-full" : ""

  return (
    <button
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Загрузка...
        </span>
      ) : children}
    </button>
  )
}