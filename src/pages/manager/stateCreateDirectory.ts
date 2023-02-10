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
  stateStatusRunning(state, {
    who: 'stateCreateDirectory',
    message: 'creating',
  })

  if (state.directories.includes(directory)) {
    stateStatusOk(state, {
      who: 'stateCreateDirectory',
      message: 'directory already exists',
      data: { directory },
    })
    return
  }

  const response = await fetch(`${state.url}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ directory }),
  })

  if (response.ok) {
    state.directories.push(directory)
    state.currentDirectory = directory
    stateStatusOk(state, {
      who: 'stateCreateDirectory',
      message: 'created directory',
      data: { directory },
    })
  } else {
    stateStatusError(state, {
      who: 'stateCreateDirectory',
      message: response.statusText,
    })
  }
}
