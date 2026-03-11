import { InputHTMLAttributes, forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", ...props }, ref) => {
    const base = "w-full border px-3 py-2.5 text-sm outline-none transition-colors"
    const state = error
      ? "border-red-500 focus:border-red-500"
      : "border-neutral-300 focus:border-black"

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-neutral-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`${base} ${state} ${className}`}
          {...props}
        />
        {hint && !error && (
          <span className="text-xs text-neutral-500">{hint}</span>
        )}
        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"