import { reactive } from 'vue'
import { State } from './State'
import { stateReactUpdateDataset } from './stateReactUpdateDataset'

export function stateReact(inputState: State): State {
  const state = reactive<State>(inputState)

  stateReactUpdateDataset(state)

  return state
}
