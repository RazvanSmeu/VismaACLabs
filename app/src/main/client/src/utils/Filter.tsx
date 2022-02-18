export type FilterOperation = string;

export type Filtered<Op extends string> = {
	filters: Map<FilterOperation, string[]>;
	putFilter(operation: Op, ...parameters: string[]): void;
	clearFilter(filterOp: Op): void;
}
