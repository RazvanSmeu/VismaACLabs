import { useEffect, useState } from "react";
import { Subject } from "../Subject";
import { Valid } from "../Validated";
import { StorageSpec } from "./Storage";

export function useStorage<T>(spec: StorageSpec<T>): Subject<T> {
	function getInitialContents(): T {
		const storedValue = localStorage.getItem(spec.label);
		if(storedValue !== null) {
			return JSON.parse(storedValue);
		} else {
			return spec.defaultValue
		}
	}
	const [contents, setContentsState] = useState(getInitialContents);

	function setContents(newContents: T): void {
		localStorage.setItem(spec.label, JSON.stringify(newContents));
		setContentsState(newContents);
		window.dispatchEvent( new Event('storage') )
	}

	function clear() {
		localStorage.removeItem(spec.label);
		setContentsState(spec.defaultValue);
		window.dispatchEvent( new Event('storage') )
	}

	useEffect(() => {
		console.log("inited");
		window.addEventListener("storage", () => {
			setContentsState(getInitialContents());
		})
	}, []);

	return {
		value: contents,
		set: setContents,
		reset: clear,
		validation: Valid
	}
}