import { HttpError } from './HttpError'

export type Values = Record<string, string | boolean>

type Unprocessable = {
  errors: Record<string, string>
}

export class Form<T extends Values> {
  processing = false
  unprocessable?: Unprocessable

  constructor(public values: T) {}

  loadValuesFromEvent(event: Event) {
    const target: any = event.target

    for (const key of Object.keys(this.values)) {
      if (target.hasOwnProperty(key)) {
        if (target[key].type === 'checkbox') {
          ;(this.values as any)[key] = target[key].checked
        } else {
          ;(this.values as any)[key] = target[key].value
        }
      } else {
        console.log({
          who: 'Form.loadValuesFromEvent',
          message: `The event target does not have key: ${key}`,
        })
      }
    }
  }

  async submit(
    event: Event,
    action: ((values: T) => Promise<void>) | ((values: T) => void),
  ): Promise<void> {
    this.loadValuesFromEvent(event)

    this.processing = true
    this.unprocessable = undefined

    try {
      // NOTE We should not pass reactive `this.values` around.
      const values = JSON.parse(JSON.stringify(this.values))
      await action(values)
    } catch (error) {
      if (!(error instanceof Error)) throw error
      if (error instanceof HttpError) {
        if (error.response.status === 422) {
          this.unprocessable = await error.response.json()
        }
      }
    }

    this.processing = false
  }
}
