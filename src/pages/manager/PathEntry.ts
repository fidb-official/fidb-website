import { basename } from 'path-browserify'

export type PathEntryKind = 'File' | 'Directory'

export type PathEntryOptions = {
  kind: PathEntryKind
  path: string
  isOpen?: boolean
}

export type PathEntry = PathEntryOptions & {
  basename: string
  children: Array<PathEntry>
  isOpen: boolean
}

export function createPathEntry(options: PathEntryOptions): PathEntry {
  const { kind, path, isOpen } = options

  return {
    kind,
    path,
    get basename() {
      return basename(this.path)
    },
    children: [],
    isOpen: isOpen || false,
  }
}

export function pathEntryPartialSummation(
  pathEntry: PathEntry,
): Array<PathEntry> {
  if (pathEntry === undefined) {
    return []
  }

  const basenames = pathEntry.path.split('/')

  const prefix: Array<string> = []

  return basenames.map((basename, index) => {
    const path = [...prefix, basename].join('/')

    prefix.push(basename)

    const kind = index === basenames.length - 1 ? pathEntry.kind : 'Directory'

    return createPathEntry({
      kind,
      path,
    })
  })
}
