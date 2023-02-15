import { useGlobalToken } from '../../reactives/useGlobalToken'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateCreateDirectory(
  state: State,
  directory: string,
): Promise<void> {
  const who = 'stateCreateDirectory'

  stateStatusRunning(state, { who, message: 'creating' })

  if (state.directories.includes(directory)) {
    stateStatusOk(state, {
      who,
      message: 'directory already exists',
      data: { directory },
    })
    return
  }

  const response = await fetch(`${state.url}/${directory}?kind=directory`, {
    method: 'POST',
    headers: {
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    state.directories.push(directory)
    state.currentDirectory = directory
    stateStatusOk(state, {
      who,
      message: 'created directory',
      data: { directory },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}
