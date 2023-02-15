import { reactive } from 'vue'
import { Form, Values } from '../components/form/Form'

export function useForm<T extends Values>(values: T) {
  return reactive(new Form(values))
}
