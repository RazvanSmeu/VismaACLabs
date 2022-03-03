import { Subject } from "../Subject";
import { useStorage } from "./useStorage"

export enum Persistance {
	Local,
	Session
}

export type StorageSpec<T> = {
	readonly label: string,
	readonly type: Persistance,
	readonly defaultValue: T,
	useSpec(): Subject<T>
}

export function StorageSpec<T>(type: Persistance, label: string, defaultValue: T): StorageSpec<T> {
	const spec: StorageSpec<T> = {
		label,
		type,
		defaultValue,
		useSpec
	}
	
	function useSpec(): Subject<T> {
		return useStorage(spec);
	}
	return spec;
}

export const SearchSpec = StorageSpec<String>(Persistance.Local, "SEARCH_QUERY", "")
export const TokenSpec  = StorageSpec<String | null>(Persistance.Session, "SESSION_KEY", null)