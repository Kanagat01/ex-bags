import { useState, useCallback } from "react"
import { validatePhoto } from "@/utils"

interface UseFileUploadOptions {
  maxFiles: number
  onChange: (files: File[]) => void
}

export const useFileUpload = ({ maxFiles, onChange }: UseFileUploadOptions) => {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles)
      setError(null)

      for (const file of fileArray) {
        const validationError = validatePhoto(file)
        if (validationError) {
          setError(validationError)
          return
        }
      }

      setFiles((prev) => {
        const merged = [...prev, ...fileArray].slice(0, maxFiles)

        const newPreviews = merged.map((f) => URL.createObjectURL(f))
        setPreviews((old) => {
          old.forEach((url) => URL.revokeObjectURL(url))
          return newPreviews
        })

        onChange(merged)
        return merged
      })
    },
    [maxFiles, onChange]
  )

  const removeFile = useCallback(
    (index: number) => {
      setFiles((prev) => {
        const updated = prev.filter((_, i) => i !== index)
        const newPreviews = updated.map((f) => URL.createObjectURL(f))
        setPreviews((old) => {
          old.forEach((url) => URL.revokeObjectURL(url))
          return newPreviews
        })
        onChange(updated)
        return updated
      })
    },
    [onChange]
  )

  return { files, previews, error, addFiles, removeFile }
}