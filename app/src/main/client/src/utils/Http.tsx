import { USER_SESSION } from '../types/User'
import { ParamLocation } from './Endpoint'

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
      if (paramLocations.includes(ParamLocation.InQuery)) {
        if (typeof body === 'number') {
          params.set('id', '' + body)
        }
      }
    }
    if (paramLocations.includes(ParamLocation.InBody)) {
      info.body = JSON.stringify(body)
    }

    const currentUserJson = localStorage.getItem('doubletex-app-user')
    info.headers = {
      ...info.headers,
      'Content-Type': 'application/json'
    }
    if (currentUserJson !== null) {
      info.headers = {
        ...info.headers,
        Authorization: 'Bearer ' + JSON.parse(currentUserJson).latestToken
      }
    }
    const response = await fetch(url, info)
    const object = await response.json()

    if (!response.ok || object.invalid) {
      throw object
    }

    return object
  }
}
