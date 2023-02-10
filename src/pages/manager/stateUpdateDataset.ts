import qs from 'qs'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateUpdateDataset(state: State, directory: string) {
  state.dataset = []
  stateStatusRunning(state, {
    who: 'stateUpdateDataset',
    message: 'running',
  })

  const query = {
    page: state.page,
    size: state.size,
    properties: {},
  }

  const response = await fetch(
    `${state.url}/${directory}?${qs.stringify(query)}`,
  )

  if (response.ok) {
    const { results } = await response.json()

    state.dataset = results
    stateStatusOk(state, {
      who: 'stateUpdateDataset',
      data: {
        directory,
        page: state.page,
        size: state.size,
      },
    })
  } else {
    stateStatusError(state, {
      who: 'stateUpdateDataset',
      message: response.statusText,
    })
  }
}
