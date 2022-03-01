import { useMemo, useState } from "react"
import { Valid, Validation } from "./Validated";

export type Subject<T> = {
	readonly value: T;
	set(value: T): void;
	reset(): void;
	validation: Validation;
}

export function useSubject<T>(defaultValue: T, validate?: (value: T) => Validation): Subject<T> {
	const [value, set] = useState<T>(defaultValue);

	function reset() {
		set(defaultValue);
	}

	const validation = validate === undefined ? Valid : validate?.(value);

	return {
		value,
		set,
		reset,
		validation
	}
}