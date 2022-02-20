import { useState } from "react";

export type FilterTag = string;
export type FilterOperation = string;

export class Filter<Op extends FilterOperation> {
	readonly tag: FilterTag;
	readonly operation: Op;
	readonly parameters: string[];

	public constructor(tag: FilterTag, operation: Op, ...parameters: string[]) {
		this.tag = tag;
		this.operation = operation;
		this.parameters = parameters;
	}
}

export type Filtered<Op extends FilterOperation> = {
	filterMap: Map<FilterTag, Filter<Op>>;
	filters: Filter<Op>[];
	putFilter(filter: Filter<Op>): void;
	clearFilter(tag: FilterTag): void;
}

export function useFilterLedger<Op extends FilterOperation>(
	doFiltering: (filters: Filter<Op>[]) => void
): Filtered<Op> {
	const [filterMap, setFilterMap] = useState<Map<string, Filter<Op>>>(new Map());
	const [filters, setFilters] = useState<Filter<Op>[]>([]);

	function toFilterArray(map: Map<FilterTag, Filter<Op>>) {
		const filters: Filter<Op>[] = [];
		filterMap.forEach((value) => filters.push(value))
		return filters;
	}

	function putFilter(filter: Filter<Op>): void {
		filterMap.set(filter.tag, filter);
		const newFilters = toFilterArray(filterMap);
		setFilters(newFilters);
		setFilterMap(filterMap);
		doFiltering(newFilters);
	}

	function clearFilter(filterOp: Op): void {
		const newFilterMap = filterMap;
		newFilterMap.delete(filterOp);
		const newFilters = toFilterArray(newFilterMap);
		setFilters(newFilters);
		setFilterMap(newFilterMap);
		doFiltering(newFilters);
	}

	return {
		putFilter,
		clearFilter,
		filters,
		filterMap
	}
}