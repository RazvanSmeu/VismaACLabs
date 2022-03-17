import { useEffect } from 'react'
import { USER_SESSION } from '../../../types/User'
import {
  ACCEPT_INVITE,
  CREATE_COMPANY,
  GET_NEXT_INVITE,
  UserInviteInfo
} from '../../../types/UserInvite'
import { useSubject } from '../../../utils/Subject'
import { CompanyWizardProps } from './CompanyWizard'

export function useTestCompanyWizard(haveInvite: boolean): CompanyWizardProps {
  return {
    userId: 2355123,
    invite: haveInvite
      ? {
          id: 0,
          inviterName: 'Are Meisfjord',
          companyName: 'Tripletex',
          employeeName: 'Razvan Smeu',
          employeeId: 3
        }
      : undefined,
    doJoin(inviteId: number) {
      // do nothing
    },
    doCreate(name: string) {
      // do nothing
    }
  }
}

export function useCompanyWizard(): CompanyWizardProps {
  const user = USER_SESSION.useSpec()
  const invite = useSubject<UserInviteInfo | undefined>(undefined)
  if (user.value == undefined) throw 'User not defined'

  async function populate() {
    invite.set(await GET_NEXT_INVITE.call({}))
  }

  useEffect(() => {
    setTimeout(populate, 2000)
    populate()
  }, [])

  return {
    userId: user.value?.id,
    invite: invite.value,
    async doJoin() {
      if (invite.value !== undefined) {
        const newUser = await ACCEPT_INVITE.call(invite.value.id)
        user.set(newUser)
      }
    },
    async doCreate(name: string) {
      const newUser = await CREATE_COMPANY.call({ name })
      user.set(newUser)
    }
  }
}
