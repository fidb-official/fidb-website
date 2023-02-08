import qs from 'qs'
import { State } from './State'

export async function stateUpdateDataset(state: State, directory: string) {
  state.dataset = []
  state.message = `[stateUpdateDataset] running...`
  state.status = 'running'

  const response = await fetch(
    `${state.url}/${directory}?${qs.stringify({
      page: state.page,
      size: 50,
      properties: {},
    })}`,
  )

  const { results } = await response.json()

  state.dataset = results
  state.message = `[stateUpdateDataset] directory: ${directory}, page: ${state.page}`
  state.status = 'ok'
}
