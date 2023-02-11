import { Cell } from './Cell'
import { State } from './State'
import { stateSaveCell } from './stateSaveCell'
import { stateStatusError } from './stateStatus'

export async function stateSaveJson(
  state: State,
  cell: Cell,
  text: string,
): Promise<void> {
  try {
    const json = text.trim() === '' ? null : JSON.parse(text)
    cell.value = json
    await stateSaveCell(state, cell)
  } catch (error) {
    stateStatusError(state, {
      who: 'saveJson',
      message: error instanceof Error ? error.message : 'Unknown Error',
    })
  }
}
