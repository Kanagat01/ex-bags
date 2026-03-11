export interface ApiError {
  detail: string
}

export interface ApiSuccess {
  detail: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}