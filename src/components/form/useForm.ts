import { reactive } from 'vue'
import { Form, FormValues } from './Form'

export function useForm(values: FormValues): Form {
  return reactive({
    values,
    processing: false,
  })
}
