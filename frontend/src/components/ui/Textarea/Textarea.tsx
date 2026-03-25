import { TextareaHTMLAttributes, forwardRef } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", ...props }, ref) => {
    const base = "w-full border-[0.8px] rounded-[8px] px-3 py-2.5 text-sm outline-none transition-colors resize-none"
    const state = error
      ? "border-red-500 focus:border-red-500"
      : "border-black"

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-neutral-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
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

Textarea.displayName = "Textarea"