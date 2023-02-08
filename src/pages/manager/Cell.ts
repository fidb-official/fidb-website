type Kind =
  | 'String'
  | 'Number'
  | 'Null'
  | 'Boolean'
  | 'Array'
  | 'Table'
  | 'Object'

export type Cell = {
  '@id': string
  '@revision': string
  columnName: string
  kind: Kind
  value: any
}

export function createCell(
  id: string,
  revision: string,
  columnName: string,
  value: any,
): Cell {
  return {
    '@id': id,
    '@revision': revision,
    columnName,
    kind: valueKind(value),
    value,
  }
}

export function valueKind(value: any): Kind {
  if (value === null) {
    return 'Null'
  }

  if (typeof value === 'boolean') {
    return 'Boolean'
  }

  if (typeof value === 'string') {
    return 'String'
  }

  if (typeof value === 'number') {
    return 'Number'
  }

  if (value instanceof Array) {
    if (value.every((value) => valueKind(value) === 'Object')) {
      return 'Table'
    }

    return 'Array'
  }

  if (typeof value === 'object') {
    return 'Object'
  }

  throw new Error(`[valueKind] unknown value: ${JSON.stringify(value)}`)
}
