export type BookData<T> = {
  page: T[]
}

export type BookMetaData = {
  pageSize: number
  pageNumber: number
  pageLimit: number
  loaded: boolean
}

export type BookControls = {
  setPageSize(size: number): void
  setPageNumber(page: number): void
}

export type AdvancedBookControls = BookControls & {
  toNextPage(): void
  toPreviousPage(): void
  toFirstPage(): void
  toLastPage(): void
  flipForward(by: number): void
  flipBackwards(by: number): void
}

export type DataBook<T> = BookControls & BookMetaData & BookData<T>

export function evolveBookControls<BC extends BookControls & BookMetaData>(
  basicControls: BC
): BC & AdvancedBookControls {
  return {
    ...basicControls,
    toNextPage() {
      basicControls.setPageNumber(basicControls.pageNumber + 1)
    },
    toPreviousPage() {
      basicControls.setPageNumber(basicControls.pageNumber - 1)
    },
    toFirstPage() {
      basicControls.setPageNumber(0)
    },
    toLastPage() {
      basicControls.setPageNumber(basicControls.pageLimit)
    },
    flipForward(by: number) {
      basicControls.setPageNumber(basicControls.pageNumber + by)
    },
    flipBackwards(by: number) {
      basicControls.setPageNumber(basicControls.pageNumber - by)
    }
  }
}
