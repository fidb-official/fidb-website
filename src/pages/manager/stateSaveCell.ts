import { Cell } from './Cell'
import { State } from './State'

export async function stateSaveCell(state: State, cell: Cell): Promise<void> {
  const data = state.dataset[cell.index]
  if (data[cell.columnName] === cell.value) {
    return
  }

  const response = await fetch(`${state.url}/${data['@id']}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      '@revision': data['@revision'],
      [cell.columnName]: cell.value,
    }),
  })

  if (!response.ok) {
    state.message = `[stateSaveCell] ${response.statusText}`
    console.error(response)
    return
  }

  const result = await response.json()
  const index = state.dataset.findIndex(
    (data: any) => data['@id'] === result['@id'],
  )

  if (index === -1) {
    state.dataset.push(result)
  } else {
    state.dataset[index] = result
  }

  state.message = `[stateSaveCell] cell saved, @id: ${data['@id']}, column: ${cell.columnName}`
}
