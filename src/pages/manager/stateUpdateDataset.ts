import qs from 'qs'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateUpdateDataset(state: State, directory: string) {
  const who = 'stateUpdateDataset'

  state.dataset = []
  stateStatusRunning(state, {
    who,
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
      who,
      data: {
        directory,
        page: state.page,
        size: state.size,
      },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}
