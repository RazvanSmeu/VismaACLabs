import { Http } from './Http'
import { Validation } from './Validated'

export enum CrudMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum ParamLocation {
  InUrl,
  InQuery,
  InBody,
  Id
}

export type CrudAPI<T> = {
  GET: Endpoint<number, T>
  POST: Endpoint<T, Validation>
  PUT: Endpoint<T, Validation>
  DELETE: Endpoint<number, Validation>
}

export type Endpoint<In, Out> = {
  readonly method: CrudMethod
  readonly url: string
  readonly paramLocations: ParamLocation[]
  call(
    input: In,
    facilitator?: (url: string, body: RequestInit & { rawBody: In }) => Promise<Out>
  ): Promise<Out>
}

export function Endpoint<In, Out>(
  method: CrudMethod,
  url: string,
  ...paramLocations: ParamLocation[]
): Endpoint<In, Out> {
  if (paramLocations === []) {
    paramLocations = [ParamLocation.Id]
  }
  return {
    method,
    url,
    paramLocations,
    async call(
      input: In,
      facilitator: (
        url: string,
        body: any,
        paramLocations: ParamLocation[],
        info: RequestInit
      ) => Promise<Out> = Http.request
    ): Promise<Out> {
      return await facilitator(url, input, paramLocations, { method })
    }
  }
}
