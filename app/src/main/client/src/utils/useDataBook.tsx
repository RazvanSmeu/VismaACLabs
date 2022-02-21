import { useEffect, useState } from "react";
import { DataBook } from "./DataBook";
import { Filter, Filtered, FilterOperation, useFilterLedger } from "./Filter";
import { Scribe } from "./Scribe";

function clamp(low: number, target: number, high: number) {
	return Math.min(high, Math.max(low, target));
}

export function useDataBook<T, Ops extends FilterOperation>(
	scribe: Scribe<T, Ops>,
	initialPageSize: number = 12,
	initialPageNumber: number = 0,
): DataBook<T> & Filtered<Ops> {
	const [page, setPage] = useState<T[]>([]);
	const [pageSize, setPageSizeUnsafe] = useState(initialPageSize);
	const [pageNumber, setPageNumberUnsafe] = useState(initialPageNumber);
	const [pageLimit, setPageLimit] = useState(0);
	const [loaded, setLoaded] = useState(false);

	async function refetch(filters: Filter<Ops>[]) {
		const request = {
			pageSize,
			pageNumber,
			filters
		}
		setLoaded(false);
		const response = await scribe(request);
		setLoaded(true);
		setPage(response.page)
		setPageLimit(response.pageLimit)
	}

	function setPageNumber(number: number) {
			if(pageLimit !== undefined && loaded) {
				number = clamp(0, number, pageLimit - 1);
			}
			setPageNumberUnsafe(number);
	}

	function setPageSize(number: number) {
			setPageNumber(0);
			setPageSizeUnsafe(clamp(0, number, pageLimit * pageSize));
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