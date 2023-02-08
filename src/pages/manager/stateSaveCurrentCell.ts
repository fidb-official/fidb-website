import { State } from './State'

export async function stateSaveCurrentCell(state: State): Promise<void> {
  const cell = state.currentCell
  if (cell === undefined) {
    return
  }

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
}
