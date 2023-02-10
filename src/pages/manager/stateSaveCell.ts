import { Cell } from './Cell'
import { State } from './State'

export async function stateSaveCell(state: State, cell: Cell): Promise<void> {
  const data = state.dataset[cell.index]
  if (data[cell.columnName] === cell.value) {
    return
  }

  state.message = '[stateSaveCell] saving...'
  state.status = 'running'

  const response = await fetch(`${state.url}/${data['@id']}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      '@revision': data['@revision'],
      [cell.columnName]: cell.value,
    }),
  })

  if (response.ok) {
    stateReplaceData(state, await response.json())
    state.message = `[stateSaveCell] saved @id: ${data['@id']}, column: ${cell.columnName}`
    state.status = 'ok'
  } else {
    state.message = `[stateSaveCell] ${response.statusText}, fetching new data `
    state.status = 'running'

    if (response.status === 409) {
      const response = await fetch(`${state.url}/${data['@id']}`)
      state.status = 'error'
      if (response.ok) {
        stateReplaceData(state, await response.json())
      } else {
        state.message = `[stateSaveCell] ${response.statusText}, fail to fetch new data`
        state.status = 'error'
      }
    }
  }
}

function stateReplaceData(state: State, input: any) {
  const index = state.dataset.findIndex(
    (data: any) => data['@id'] === input['@id'],
  )

  if (index !== -1) {
    state.dataset[index] = input
  }
}
