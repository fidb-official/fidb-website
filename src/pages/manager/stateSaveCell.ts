import { Cell } from './Cell'
import { State } from './State'
import {
  stateStatusError,
  stateStatusOk,
  stateStatusRunning,
} from './stateStatus'

export async function stateSaveCell(state: State, cell: Cell): Promise<void> {
  const who = 'stateSaveCell'

  const data = state.dataset[cell.index]
  if (data[cell.columnName] === cell.value) {
    return
  }

  stateStatusRunning(state, { who, message: 'saving' })

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
    stateStatusOk(state, {
      who,
      message: 'saved',
      data: {
        '@id': data['@id'],
        column: cell.columnName,
      },
    })
  } else {
    stateStatusRunning(state, {
      who,
      message: `${response.statusText}, fetching new data`,
      data: {
        '@id': data['@id'],
        column: cell.columnName,
      },
    })

    if (response.status === 409) {
      const response = await fetch(`${state.url}/${data['@id']}`)
      stateStatusError(state)
      if (response.ok) {
        stateReplaceData(state, await response.json())
      } else {
        stateStatusError(state, {
          who,
          message: `${response.statusText}, fail to fetch new data`,
        })
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
