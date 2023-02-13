import qs from 'qs'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateUpdateDataset(state: State) {
  const directory = state.currentDirectory
  if (directory === undefined) {
    return
  }

  const who = 'stateUpdateDataset'

  state.datasetIsLoading = true
  state.dataset = []

  stateStatusRunning(state, {
    who,
    message: 'loading',
  })

  const query = {
    page: state.page,
    size: state.size,
    properties: {},
  }

  const response = await fetch(
    `${state.url}/${directory}?kind=find&${qs.stringify(query)}`,
  )

  if (response.ok) {
    const { results } = await response.json()

    state.dataset = results
    state.datasetIsLoading = false
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
