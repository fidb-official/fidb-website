import { State } from './State'

export async function stateDeleteRow(
  state: State,
  index: number,
): Promise<void> {
  state.message = '[stateDeleteRow] deleting...'
  state.status = 'running'

  const data = state.dataset[index]
  if (data === undefined) {
    state.message = '[stateDeleteRow] row does not exist: ${index}'
    state.status = 'ok'
    return
  }

  const response = await fetch(`${state.url}/${data['@id']}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      '@revision': data['@revision'],
    }),
  })

  if (response.ok) {
    state.dataset.splice(index, 1)

    state.message = `[stateDeleteRow] deleted row: ${index}`
    state.status = 'ok'
  } else {
    state.message = `[stateDeleteRow] ${response.statusText}`
    state.status = 'error'
  }
}
