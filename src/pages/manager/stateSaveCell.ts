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
    stateStatusOk(state, {
      who,
      message: 'same value, no need to save',
      data: {
        '@patha': data['@patha'],
        column: cell.columnName,
        value: cell.value,
      },
    })
    return
  }

  stateStatusRunning(state, { who, message: 'saving' })

  const response = await fetch(`${state.url}/${data['@patha']}`, {
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
        '@patha': data['@patha'],
        column: cell.columnName,
      },
    })
  } else {
    stateStatusRunning(state, {
      who,
      message: `${response.statusText}, fetching new data`,
      data: {
        '@patha': data['@patha'],
        column: cell.columnName,
      },
    })

    if (response.status === 409) {
      const response = await fetch(`${state.url}/${data['@patha']}`)
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
    (data: any) => data['@patha'] === input['@patha'],
  )

  if (index !== -1) {
    state.dataset[index] = input
  }
}
