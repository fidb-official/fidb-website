import qs from 'qs'
import { State } from './State'

export async function stateUpdateDataset(state: State, directory: string) {
  state.dataset = []
  state.message = `[stateUpdateDataset] running...`
  state.status = 'running'

  const query = {
    page: state.page,
    size: state.size,
    properties: {},
  }

  const response = await fetch(
    `${state.url}/${directory}?${qs.stringify(query)}`,
  )

  const { results } = await response.json()

  state.dataset = results
  state.message = `[stateUpdateDataset] directory: ${directory}, page: ${state.page}, size: ${state.size}`
  state.status = 'ok'
}
