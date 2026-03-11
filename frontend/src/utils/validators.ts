import { PHOTO_ALLOWED_TYPES, PHOTO_MAX_SIZE_MB } from "./constants"

export const validatePhone = (phone: string): boolean => {
  return /^(\+7|7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(phone)
}

export const validatePassportSeries = (series: string): boolean => {
  return /^\d{4}$/.test(series)
}

export const validatePassportNumber = (number: string): boolean => {
  return /^\d{6}$/.test(number)
}

export const validateInn = (inn: string): boolean => {
  if (!inn) return true // необязательное поле
  return /^\d{12}$/.test(inn)
}

export const validatePhoto = (file: File): string | null => {
  if (!PHOTO_ALLOWED_TYPES.includes(file.type)) {
    return "Допустимые форматы: JPG, PNG"
  }
  if (file.size > PHOTO_MAX_SIZE_MB * 1024 * 1024) {
    return `Максимальный размер файла: ${PHOTO_MAX_SIZE_MB} МБ`
  }
  return null
}

export const validatePhotos = (files: File[]): string | null => {
  for (const file of files) {
    const error = validatePhoto(file)
    if (error) return error
  }
  return null
}