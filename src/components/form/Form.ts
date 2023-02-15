export type FormValues = Record<string, string | boolean>

// https://www.rfc-editor.org/rfc/rfc9110.html#name-422-unprocessable-content

export type Unprocessable = {
  errors: Record<string, string>
}

export type Form = {
  values: FormValues
  processing: boolean
  unprocessable?: Unprocessable
}
