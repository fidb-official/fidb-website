import { Cell } from './Cell'
import { State } from './State'
import { stateSaveCell } from './stateSaveCell'
import { stateStatusError } from './stateStatus'

export async function stateSaveCellFromText(
  state: State,
  cell: Cell,
  text: string,
): Promise<boolean> {
  try {
    const json = text.trim() === '' ? null : JSON.parse(text)
    cell.value = json
    await stateSaveCell(state, cell)
    return true
  } catch (error) {
    stateStatusError(state, {
      who: 'stateSaveCellFromText',
      message: error instanceof Error ? error.message : 'Unknown Error',
    })
    return false
  }
}
