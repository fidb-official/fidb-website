import { State } from './State'

export async function stateCreateDirectory(
  state: State,
  directory: string,
): Promise<void> {
  state.message = '[stateCreateDirectory] creating...'
  state.status = 'running'

  if (state.directories.includes(directory)) {
    state.message =
      '[stateCreateDirectory] directory already exists: ${directory}'
    state.status = 'ok'
    return
  }

  const response = await fetch(`${state.url}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ directory }),
  })

  if (!response.ok) {
    state.message = `[stateCreateDirectory] ${response.statusText}`
    state.status = 'error'
    return
  }

  state.directories.push(directory)

  state.message = `[stateCreateDirectory] created directory: ${directory}`
  state.status = 'ok'
}
