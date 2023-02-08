import { reactive } from 'vue'
import { State } from './State'
import { stateUpdateDataset } from './stateUpdateDataset'

export function stateReact(inputState: State): State {
  const state = reactive<State>(inputState)

  stateUpdateDataset(state)

  return state
}
