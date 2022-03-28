import { CrudMethod, Endpoint, ParamLocation } from '../utils/Endpoint'
import { User } from './User'

export type UserInviteInfo = {
  id: number
  inviterName: string
  companyName: string
  employeeName: string
  employeeId: number
}

export const GET_NEXT_INVITE = Endpoint<{}, UserInviteInfo>(CrudMethod.GET, '/api/user/nextInvite')
export const ACCEPT_INVITE = Endpoint<{ inviteId: number }, User>(
  CrudMethod.PUT,
  '/api/user/acceptInvite',
  ParamLocation.InQuery
)
export const CREATE_COMPANY = Endpoint<{ name: string }, void>(
  CrudMethod.POST,
  '/api/company/create',
  ParamLocation.InQuery
)
