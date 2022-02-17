export class Filter<Op>{
	readonly operation: Op;
	readonly parameters: string[];

	public constructor(operation: Op, ...parameters: string[]) {
			this.operation = operation;
			this.parameters = parameters;
	}
}

export type Filtered<Op extends string> = {
	filters: Filter<Op>[];
	putFilter(filter: Filter<Op>): void;
	clearFilter(filterOp: Op): void;
}
