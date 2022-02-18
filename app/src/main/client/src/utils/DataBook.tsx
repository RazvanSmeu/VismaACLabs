import {useEffect, useState} from "react";
import { Filtered } from "./Filter";

export type BookControls = {
    setPageSize(size: number): void;
    setPageNumber(page: number): void;
}

export type AdvancedBookControls = BookControls & {
    toNextPage(): void,
    toPreviousPage(): void,
    toFirstPage(): void,
    toLastPage(): void,
    flipForward(by: number): void,
    flipBackwards(by: number): void,
}

export function createAdvancedBookControls<BC extends BookControls & BookMetaData>(basicControls: BC): BC & AdvancedBookControls {
    return {
        ...basicControls,
        toNextPage() {
            basicControls.setPageNumber(basicControls.pageNumber + 1);
        },
        toPreviousPage() {
            basicControls.setPageNumber(basicControls.pageNumber - 1);
        },
        toFirstPage() {
            basicControls.setPageNumber(0);
        },
        toLastPage() {
            basicControls.setPageNumber(basicControls.pageLimit);
        },
        flipForward(by: number) {
            basicControls.setPageNumber(basicControls.pageNumber + by);
        },
        flipBackwards(by: number) {
            basicControls.setPageNumber(basicControls.pageNumber - by);
        },
    };
}

export type BookMetaData = {
    pageSize: number;
    pageNumber: number;
    pageLimit: number;
    loaded: boolean;
}

export type BookData<T> = {
    page: T[]
}

export type DataBook<T> = BookControls & BookMetaData & BookData<T>;

export type FilteredDataBook<T, Ops extends string> = DataBook<T> & Filtered<Ops>;

export function useMockDataBook<T, Ops extends string>(all: T[], filterInterpeter: (prev: T, filterOperation: Ops, parameters: string[]) => boolean, initialPageSize: number = 10, initialPageNumber: number = 0): FilteredDataBook<T, Ops> {
    const [pool, setPool] = useState(all);
    const [page, setPage] = useState(all);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const [filters, setFiltersBasic] = useState<Map<Ops, string[]>>(new Map());
    const pageLimit = Math.floor(pool.length / pageSize)

    function setPageNumberSafe(number: number) {
        setPageNumber(Math.max(0, Math.min(pageLimit - 1, number)));
    }

    function setPageSizeSafe(number: number) {
        setPageNumber(0);
        setPageSize(Math.max(0, Math.min(pool.length - 1, number)));
    }

    useEffect(() => {
        setPage(pool.slice(Math.max(0, pageNumber * pageSize), Math.min(pool.length, (pageNumber + 1) * pageSize)))
    }, [pageNumber, pageSize, pool])

    function doFiltering(filters: Map<Ops, string[]>) {
        var current = all;
        filters.forEach((params, ops) => {
            current = current.filter((value) => filterInterpeter(value, ops, params));
        })
        setPool(current);
        setFiltersBasic(filters)
    }

		function putFilter(operation: Ops, ...parameters: string[]): void {
			doFiltering({
				...filters,
				[operation]: parameters
			})
		}

		function clearFilter(filterOp: Ops): void {
			const newFilters = filters;
			newFilters.delete(filterOp);
			setFiltersBasic(newFilters);
			doFiltering(newFilters);
		}

    return {
        pageSize,
        setPageSize: setPageSizeSafe,
        pageNumber,
        setPageNumber: setPageNumberSafe,
        page,
        pageLimit,
        loaded: true,
        filters,
        putFilter,
        clearFilter
    }
}