export interface Contract {
  id: string
  sign_token: string
  is_signed: boolean
  signed_at: string | null
  signed_by_phone: string
  created_at: string
}

export interface ConfirmSignaturePayload {
  code: string
}