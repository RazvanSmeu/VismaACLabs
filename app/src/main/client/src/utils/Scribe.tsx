import { Endpoint } from './Endpoint'
import { Filter, FilterOperation } from './Filter'

/**
 * Type used by DataBook objects to request data from scribes
 */
export type PageRequest<Op extends FilterOperation> = {
  pageNumber: number
  pageSize: number
  filters: Filter<Op>[]
}

/**
 * Type returned by scribes to DataBooks
 */
export type PageResponse<T> = {
  pageLimit: number
  page: T[]
}

/**
 * Request fulfiller, a "Scribe" writes in DataBooks
 * Can be mocked (writing from an array) or from network (writing from fetches)
 */
export type Scribe<T, Ops extends FilterOperation> = (
  request: PageRequest<Ops>
) => Promise<PageResponse<T>>

/**
 * Create a new scribe that writes from the network
 * @param url The url to call for the page
 * @param additionalInfo What else to put in the request body
 * @returns Scribe that writes T objects and uses filters with Ops operations
 */
export function NetworkScribe<T, Ops extends FilterOperation>(
  endpoint: Endpoint<PageRequest<Ops>, PageResponse<T>>,
  additionalInfo?: RequestInit
): Scribe<T, Ops> {
  return async (request) => {
    // const requestInfo = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8'
    //   },
    //   ...additionalInfo,
    //   body: JSON.stringify(request)
    // }
    const response = await endpoint.call(request)
    // const fetchResponse = await fetch(url, requestInfo)
    // const response = await fetchResponse.json()
    if (response.pageLimit === undefined) {
      throw new Error('Page limit was missing from network request.')
    }
    if (response.page === undefined) {
      throw new Error('Page was missing from network request.')
    }
    return response
  }
}

/**
 * Create a new scribe that writes pages only from the in-memory array "all"
 * @param all All the entries that are writable in pages
 * @param filterInterpeter Predicate that filters entries based on the filters it was given
 * @returns Scribe that writes T objects and uses filters with Ops operations
 */
export function InMemoryScribe<T, Ops extends FilterOperation>(
  all: T[],
  filterInterpeter: (prev: T, filter: Filter<Ops>) => boolean
): Scribe<T, Ops> {
  return ({ pageNumber, pageSize, filters }) => {
    let pool = all
    for (const filter of filters) {
      pool = pool.filter((value) => filterInterpeter(value, filter))
    }
    return Promise.resolve({
      page: pool.slice(
        Math.max(0, pageNumber * pageSize),
        Math.min(pool.length, (pageNumber + 1) * pageSize)
      ),
      pageLimit: Math.ceil(pool.length / pageSize)
    })
  }
}
