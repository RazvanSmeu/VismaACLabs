import { useStorage } from "./useStorage"

export enum Persistance {
	Local,
	Session,
	Cookie
}

export type Storage<T> = {
	readonly contents: T,
	setContents(newContents: T): void
	clear(): void
}

export type StorageSpec<T> = {
	readonly label: string,
	readonly type: Persistance,
	readonly defaultValue: T,
	use(): Storage<T>
}

export function StorageSpec<T>(type: Persistance, label: string, defaultValue: T): StorageSpec<T> {
	const spec: StorageSpec<T> = {
		label,
		type,
		defaultValue,
		use
	}
	
	function use(): Storage<T> {
		return useStorage(spec);
	}
	return spec;
}

export const SearchSpec = StorageSpec<String>(Persistance.Local, "SEARCH_QUERY", "")
export const TokenSpec  = StorageSpec<String | null>(Persistance.Session, "SESSION_KEY", null)