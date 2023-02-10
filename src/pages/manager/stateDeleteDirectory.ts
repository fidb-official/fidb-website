import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateDeleteDirectory(
  state: State,
  directory: string,
): Promise<void> {
  const who = 'stateDeleteDirectory'

  stateStatusRunning(state, { who, message: 'deleting' })

  if (!state.directories.includes(directory)) {
    stateStatusOk(state, {
      who,
      message: 'directory does not exist',
      data: { directory },
    })
    return
  }

  const response = await fetch(`${state.url}/${directory}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    const index = state.directories.indexOf(directory)
    if (index !== -1) {
      state.directories.splice(index, 1)
    }

    if (state.currentDirectory == directory) {
      state.currentDirectory = state.directories[0]
    }

    stateStatusOk(state, {
      who,
      message: 'deleted directory',
      data: { directory },
    })
  } else {
    stateStatusError(state, {
      who,
      message: response.statusText,
    })
  }
}
