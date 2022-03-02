import { unstable_useIsFocusVisible } from "@mui/utils";

export enum CrudMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"
}

export class Endpoint<In, Out> {
	public constructor(readonly method: CrudMethod, readonly url: string) {}

	async call(
		input: In,
		facilitator: (url: string, body: RequestInit & {rawBody: In}) => Promise<Out> = Http.request
	): Promise<Out> {
		return facilitator(this.url, {
			method: this.method,
			rawBody: input,
		});
	}
}

export const Http = {
	async request<T>(url: string, info: RequestInit & {rawBody: any}): Promise<T> {
		let params = null as any as URLSearchParams;
		// if(info.method === "GET") {
			params = new URLSearchParams();
		// }
		if(info.rawBody) {
			for(const [key, value] of Object.entries(info.rawBody)) {
				if(params !== null) {
					params.set(key, "" + value);
					url.replace(`${key}`, "" + value);
				}
			}
		}
		if(params !== null) {
			url += "?" + params.toString();
			if(typeof info.rawBody === "number") {
				url = url.replace("{id}", "" + info.rawBody);
			}
		}
		const response = await fetch(url, info);
		const object   = await response.json();

		if(!response.ok) {
			if(object.message) {
				throw object.message;
			} else {
				throw object;
			}
		}

		return object;
	}
}