import { reactive } from 'vue'

export type Values = Record<string, string | boolean>

// https://www.rfc-editor.org/rfc/rfc9110.html#name-422-unprocessable-content

type Unprocessable = {
  errors: Record<string, string>
}

type Action = (values: Values) => Promise<{
  unprocessable?: Unprocessable
} | void>

export type Form = {
  values: Values
  processing: boolean
  unprocessable?: Unprocessable
}

export function useForm(values: Values): Form {
  return reactive({
    values,
    processing: false,
  })
}

export async function formSubmit(
  form: Form,
  event: Event,
  action: Action,
): Promise<void> {
  form.processing = true
  form.unprocessable = undefined

  assignValuesFromEvent(event, form.values)
  const result = await action(form.values)

  form.unprocessable = result?.unprocessable
  form.processing = false
}

function assignValuesFromEvent(event: Event, values: Values): void {
  const target: any = event.target

  for (const key of Object.keys(values)) {
    if (target.hasOwnProperty(key)) {
      if (target[key].type === 'checkbox') {
        values[key] = target[key].checked
      } else {
        values[key] = target[key].value
      }
    }
  }
}
