import { useEffect, useState } from "react";
import { BookData, DataBook } from "./DataBook";
import { Filter, Filtered, FilterOperation, useFilterLedger } from "./Filter";

function clamp(low: number, target: number, high: number) {
	return Math.min(high, Math.max(low, target));
}

export type DataBookRequest<Op extends FilterOperation> = {
	pageNumber: number,
	pageSize: number,
	filters: Filter<Op>[]
}

export type DataBookResponse<T> = {
	pageLimit: number,
	page: T[]
}

export type DataBookHandler<T, Ops extends FilterOperation> = (request: DataBookRequest<Ops>) => Promise<DataBookResponse<T>>

export function useDataBook<T, Ops extends FilterOperation>(
	handler: DataBookHandler<T, Ops>,
	initialPageSize: number = 12,
	initialPageNumber: number = 0,
): DataBook<T> & Filtered<Ops> {
	const [page, setPage] = useState<T[]>([]);
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [pageNumber, setPageNumber] = useState(initialPageNumber);
	const [pageLimit, setPageLimit] = useState(0);
	const [loaded, setLoaded] = useState(false);

	async function refetch(filters: Filter<Ops>[]) {
		const request = {
			pageSize,
			pageNumber,
			filters
		}
		setLoaded(false);
		const response = await handler(request);
		setLoaded(true);
		setPage(response.page)
		setPageLimit(response.pageLimit)
	}

	const filterLedger = useFilterLedger(refetch);
	
	useEffect(() => {
		refetch(filterLedger.filters)
	}, [pageSize, pageNumber])

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

export function useMockDataBookHandler<T, Ops extends FilterOperation>(
	all: T[],
	filterInterpeter: (prev: T, filter: Filter<Ops>) => boolean
): DataBookHandler<T, Ops> {
	return ({pageNumber, pageSize, filters}) => {
		var pool = all;
		for(const filter of filters) {
			pool = pool.filter(value => filterInterpeter(value, filter));
		}
		return Promise.resolve({
			page: pool.slice(Math.max(0, pageNumber * pageSize), Math.min(pool.length, (pageNumber + 1) * pageSize)),
			pageLimit: pool.length / pageSize
		});
	};
}

export function useMockDataBook<T, Ops extends string>(
	all: T[],
	filterInterpeter: (prev: T, filter: Filter<Ops>) => boolean,
	initialPageSize: number = 10,
	initialPageNumber: number = 0
): DataBook<T> & Filtered<Ops> {
	const [pool, setPool] = useState(all);
	const [page, setPage] = useState(all);
	const [pageSize, setPageSizeUnsafe] = useState(initialPageSize);
	const [pageNumber, setPageNumberUnsafe] = useState(initialPageNumber);
	const pageLimit = Math.floor(pool.length / pageSize)

	function setPageNumber(number: number) {
			setPageNumberUnsafe(clamp(0, number, pageLimit - 1));
	}

	function setPageSize(number: number) {
			setPageNumber(0);
			setPageSizeUnsafe(clamp(0, number, pool.length - 1));
	}

	useEffect(() => {
			setPage(pool.slice(Math.max(0, pageNumber * pageSize), Math.min(pool.length, (pageNumber + 1) * pageSize)))
	}, [pageNumber, pageSize, pool])

	function doFiltering(filters: Filter<Ops>[]) {
			var current = all;
			filters.forEach((filter) => {
					current = current.filter((value) => filterInterpeter(value, filter));
			})
			setPool(current);
	}

	const filterLedger = useFilterLedger<Ops>(doFiltering);

	return {
			pageSize,
			setPageSize,
			pageNumber,
			setPageNumber,
			page,
			pageLimit,
			loaded: true,
			...filterLedger
	}
}