import { useEffect, useState } from 'react'
import { DataBook } from './DataBook'
import { Filter, Filtered, FilterOperation, useFilterLedger } from './Filter'
import { Scribe } from './Scribe'

function clamp(low: number, target: number, high: number) {
  return Math.min(high, Math.max(low, target))
}

export function useDataBook<T, Ops extends FilterOperation>(
  scribe: Scribe<T, Ops>,
  initialPageSize: number = 12,
  initialPageNumber: number = 0
): DataBook<T> & Filtered<Ops> {
  const [page, setPage] = useState<T[]>([])
  const [pageSize, setPageSizeUnsafe] = useState(initialPageSize)
  const [pageNumber, setPageNumberUnsafe] = useState(initialPageNumber)
  const [pageLimit, setPageLimit] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [cache, setCache] = useState<Map<number, T[]>>(new Map())

  function refetch(invalidateCache: boolean) {
    return async (filters: Filter<Ops>[]) => {
      const request = {
        pageSize,
        pageNumber,
        filters
      }
      setLoaded(false)
      const response = await scribe(request)
      setLoaded(true)
      cache.set(request.pageNumber, response.page)
      setPage(response.page)
      setPageLimit(response.pageLimit)
    }
  }

  function setPageNumber(number: number) {
    if (pageLimit !== undefined && loaded) {
      number = clamp(0, number, pageLimit - 1)
    }
    setPageNumberUnsafe(number)
  }

  function setPageSize(number: number) {
    setPageNumber(0)
    setPageSizeUnsafe(clamp(0, number, pageLimit * pageSize))
    setCache(new Map())
  }

  // invalidate cache on new filters
  const filterLedger = useFilterLedger(refetch(true))

  useEffect(() => {
    const cacheHit = cache.get(pageNumber)
    if (cacheHit !== undefined) {
      setPage(cacheHit)
      return
    }

    refetch(false)(filterLedger.filters)
  }, [pageSize, pageNumber])

  useEffect(() => {
    setCache(new Map())
  }, [pageSize])

  return {
    page,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    pageLimit,
    loaded,
    ...filterLedger
  }
}
