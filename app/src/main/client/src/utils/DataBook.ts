import {useEffect, useState} from "react";

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

export class Filter<Op>{
    readonly operation: Op;
    readonly parameters: string[];

    public constructor(operation: Op, ...parameters: string[]) {
        this.operation = operation;
        this.parameters = parameters;
    }
}

export type Filtered<Op extends Filter<any>> = {
    filters: Op[];
    setFilters(filters: Op[]): void;
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

export type FilteredDataBook<T, Ops extends Filter<any>> = DataBook<T> & Filtered<Ops>;

export function useMockDataBook<T, Ops extends Filter<any>>(all: T[], filterInterpeter: (prev: T[], filter: Ops) => T[], initialPageSize: number = 10, initialPageNumber: number = 1): FilteredDataBook<T, Ops> {
    const [pool, setPool] = useState(all);
    const [page, setPage] = useState(all);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const [filters, setFiltersBasic] = useState<Ops[]>([]);
    const pageLimit = Math.floor(all.length / pageSize)

    function setPageNumberSafe(number: number) {
        setPageNumber(Math.max(0, Math.min(pageLimit - 1, number)));
    }

    function setPageSizeSafe(number: number) {
        setPageNumber(0);
        setPageSize(Math.max(0, Math.min(pool.length - 1, number)));
    }

    useEffect(() => {
        setPage(pool.slice(Math.max(0, pageNumber * pageSize), Math.min(pool.length, (pageNumber + 1) * pageSize)))
    }, [pageNumber, pageSize])

    function setFilters(filters: Ops[]) {
        var current = pool;
        for(const filter of filters) {
            current = filterInterpeter(current, filter);
        }
        setFiltersBasic(filters);
        setPool(current);
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
        setFilters
    }
}