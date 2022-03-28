import { CrudMethod, Endpoint, ParamLocation } from '../utils/Endpoint'
import { StorageSpec } from '../utils/storage/Storage'

export type User = {
  id: number
  userName: string
  password: string
  latestToken: string
  isTokenFrozen: boolean
  employee?: { id: number }
}

export type LoginRequest = {
  userName: string
  password: string
}

export type ResumeRequest = {
  userToken: string
}

export const USER_LOGIN = Endpoint<LoginRequest, User>(
  CrudMethod.PUT,
  '/api/user/login',
  ParamLocation.InQuery
)
export const USER_RESUME = Endpoint<ResumeRequest, User>(
  CrudMethod.PUT,
  '/api/user/resume',
  ParamLocation.InQuery
)
export const USER_REGISTER = Endpoint<LoginRequest, User>(
  CrudMethod.POST,
  '/api/user/register',
  ParamLocation.InQuery
)

export const USER_SESSION = StorageSpec<User | undefined>('doubletex-app-user', undefined)
