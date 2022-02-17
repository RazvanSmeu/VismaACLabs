import {useEffect, useState} from "react";

export type DataBook<T> = {
    pageSize: number,
    setPageSize(size: number): void,
    page: T[],
    pageNumber: number,
    setPageNumber(page: number): void
}

export function useMockDataBook<T>(all: T[], initialPageSize: number = 10, initialPageNumber: number = 1): DataBook<T> {
    const [page, setPage] = useState(all);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const maxPage = Math.floor(all.length / pageSize)

    function setPageNumberSafe(number: number) {
        setPageNumber(Math.max(0, Math.min(maxPage - 1, number)));
    }

    function setPageSizeSafe(number: number) {
        setPageNumber(0);
        setPageSize(Math.max(0, Math.min(all.length - 1, number)));
    }

    useEffect(() => {
        setPage(all.slice(Math.max(0, pageNumber * pageSize), Math.min(all.length, (pageNumber + 1) * pageSize)))
    }, [pageNumber, pageSize])

    return {
        pageSize,
        setPageSize: setPageSizeSafe,
        pageNumber,
        setPageNumber: setPageNumberSafe,
        page
    }
}