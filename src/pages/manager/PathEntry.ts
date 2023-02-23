import { basename } from 'path-browserify'

export type PathEntryKind = 'File' | 'Directory'

export type PathEntryOptions = {
  kind: PathEntryKind
  path: string
  isOpen?: boolean
}

export type PathEntry = PathEntryFile | PathEntryDirectory

export type PathEntryFile = {
  kind: 'File'
  path: string
  basename: string
}

export type PathEntryDirectory = {
  kind: 'Directory'
  path: string
  basename: string
  children: Array<PathEntry>
  isOpen: boolean
}

export function createPathEntry(options: PathEntryOptions): PathEntry {
  const { kind, path, isOpen } = options

  switch (kind) {
    case 'File': {
      return {
        kind,
        path,
        get basename() {
          return basename(this.path)
        },
      }
    }

    case 'Directory': {
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
  }
}

export function pathEntryBasename(pathEntry: PathEntry): string {
  return basename(pathEntry.path)
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
