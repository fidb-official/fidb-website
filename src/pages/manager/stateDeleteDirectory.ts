import { State } from './State'

export async function stateDeleteDirectory(
  state: State,
  directory: string,
): Promise<void> {
  state.message = '[stateDeleteDirectory] deleting...'
  state.status = 'running'

  if (!state.directories.includes(directory)) {
    state.message =
      '[stateDeleteDirectory] directory does not exist: ${directory}'
    state.status = 'ok'
    return
  }

  const response = await fetch(`${state.url}/${directory}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    state.message = `[stateDeleteDirectory] ${response.statusText}`
    state.status = 'error'
    return
  }

  const index = state.directories.indexOf(directory)
  if (index !== -1) {
    state.directories.splice(index, 1)
  }

  if (state.currentDirectory == directory) {
    state.currentDirectory = state.directories[0]
  }

  state.message = `[stateDeleteDirectory] deleted directory: ${directory}`
  state.status = 'ok'
}
