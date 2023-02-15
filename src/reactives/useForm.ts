import { reactive } from 'vue'
import { Form, Values } from '../models/Form'

export function useForm<T extends Values>(values: T) {
  return reactive(new Form(values))
}
