import { unstable_useIsFocusVisible } from '@mui/utils'
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
      return facilitator(url, input, paramLocations, { method })
    }
  }
}

export const Http = {
  async request<T>(
    url: string,
    body: any,
    paramLocations: ParamLocation[],
    info: RequestInit
  ): Promise<T> {
    let params = null as any as URLSearchParams
    if (
      paramLocations.includes(ParamLocation.InQuery) ||
      paramLocations.includes(ParamLocation.Id)
    ) {
      params = new URLSearchParams()
    }
    if (body) {
      for (const [key, value] of Object.entries(body)) {
        if (params !== null) {
          if (paramLocations.includes(ParamLocation.InQuery)) {
            params.set(key, '' + value)
          }
          if (paramLocations.includes(ParamLocation.InUrl)) {
            url.replace(`${key}`, '' + value)
          }
        }
      }
    }
    if (params !== null) {
      url += '?' + params.toString()
      if (paramLocations.includes(ParamLocation.Id)) {
        if (typeof body === 'number') {
          url = url.replace('{id}', '' + body)
        }
      }
    }
    if (paramLocations.includes(ParamLocation.InBody)) {
      info.body = JSON.stringify(body)
    }
    const token = sessionStorage.getItem('doubletex-app-user-token')
    console.log(token)
    info.headers = {
      ...info.headers,
      'Content-Type': 'application/json'
    }
    if (token !== null) {
      info.headers = {
        ...info.headers,
        Authorization: 'Bearer ' + token
      }
    }
    const response = await fetch(url, info)
    const object = await response.json()

    if (!response.ok) {
      if (object.message) {
        throw object.message
      } else {
        throw object
      }
    }

    return object
  }
}
