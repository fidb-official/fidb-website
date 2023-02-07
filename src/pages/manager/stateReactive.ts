import { reactive } from 'vue'
import { State } from './State'

export function stateReactive(inputState: State) {
  const state = reactive(inputState)
  return state
}
