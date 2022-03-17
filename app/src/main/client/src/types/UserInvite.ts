import { CrudMethod, Endpoint, ParamLocation } from '../utils/Http'
import { User } from './User'

export type UserInviteInfo = {
  id: number
  inviterName: string
  companyName: string
  employeeName: string
  employeeId: number
}

export const GET_NEXT_INVITE = Endpoint<{}, UserInviteInfo>(CrudMethod.GET, '/api/user/nextInvite')
export const ACCEPT_INVITE = Endpoint<number, User>(
  CrudMethod.PUT,
  '/api/user/acceptInvite',
  ParamLocation.InQuery
)
export const CREATE_COMPANY = Endpoint<{ name: string }, User>(
  CrudMethod.PUT,
  '/api/company/create',
  ParamLocation.InQuery
)
