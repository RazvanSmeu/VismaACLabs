import { useState } from "react";
import { StorageSpec, Storage } from "./Storage";

export function useStorage<T>(spec: StorageSpec<T>): Storage<T> {
	const [contents, setContentsState] = useState(() => {
		const storedValue = localStorage.getItem(spec.label);
		if(storedValue !== null) {
			return JSON.parse(storedValue);
		} else {
			return spec.defaultValue
		}
	});

	function setContents(newContents: T): void {
		localStorage.setItem(spec.label, JSON.stringify(newContents));
		setContentsState(newContents);
	}

	function clear() {
		localStorage.removeItem(spec.label);
		setContentsState(spec.defaultValue);
	}

	return {
		contents,
		setContents,
		clear
	}
}