import {useEffect, useState} from "react";
import {Subject} from "../Subject";
import {Valid} from "../Validated";
import {Persistance, StorageSpec} from "./Storage";

export function useStorage<T>(spec: StorageSpec<T>): Subject<T> {
	let get: (key: string) => string | null;
	let set: (key: string, value: string) => void;
	let remove: (key: string) => void;

	switch(spec.type) {
		case Persistance.Local:
			get = (key) => localStorage.getItem(key);
			set = (k, v) => localStorage.setItem(k, v);
			remove = (k) => localStorage.removeItem(k);
			break;
		case Persistance.Session:
			get = (key) => sessionStorage.getItem(key);
			set = (k, v) => sessionStorage.setItem(k, v);
			remove = (k) => sessionStorage.removeItem(k);
			break;
	}


	function getInitialContents(): T {
		const storedValue = get(spec.label);
		if(storedValue !== null) {
			return JSON.parse(storedValue);
		} else {
			return spec.defaultValue
		}
	}
	const [contents, setContentsState] = useState(getInitialContents);

	function setContents(newContents: T): void {
		set(spec.label, JSON.stringify(newContents));
		setContentsState(newContents);
		window.dispatchEvent( new Event('storage') )
	}

	function clear() {
		remove(spec.label);
		setContentsState(spec.defaultValue);
		window.dispatchEvent( new Event('storage') )
	}

	useEffect(() => {
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