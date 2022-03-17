import { Button, Divider, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { DbxPanel } from '../../../components/DbxPanel'
import { DbxInput } from '../../../components/Input/DbxInput'
import { UserInviteInfo } from '../../../types/UserInvite'
import { useSubject } from '../../../utils/Subject'
import './CompanyWizard.css'

export type CompanyJoinInfo = {
  invite?: UserInviteInfo
  doJoin(inviteId: number): void
}

export type CompanyCreateInfo = {
  doCreate(name: string): void
}

export type CompanyWizardProps = {
  userId: number
} & CompanyCreateInfo &
  CompanyJoinInfo

export function CompanyInvitation(props: CompanyJoinInfo) {
  if (props.invite !== undefined) {
    return (
      <div className='company-wizard__company-invite'>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>From admin: </TableCell>
              <TableCell>
                <strong>{props.invite.inviterName}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>In company: </TableCell>
              <TableCell>
                <strong>{props.invite.companyName}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>To join as: </TableCell>
              <TableCell>
                <strong>{props.invite.employeeName}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div>
          <Button variant='contained'>Accept</Button>
          <Button variant='contained'>Reject</Button>
        </div>
      </div>
    )
  } else {
    return <>You have no invites yet.</>
  }
}

export function CompanyWizard(props: CompanyWizardProps) {
  const companyName = useSubject('')
  return (
    <DbxPanel>
      <h2 style={{ textAlign: 'center' }}>Your ID: {('' + props.userId).padStart(12, '0')}</h2>
      <div className='company-wizard__wrapper'>
        <div className='company-wizard__join-side'>
          <h1>New Company</h1>
          <DbxInput subject={companyName} label='Name' />
          <Button variant='contained'>Create Company</Button>
        </div>
        <Divider orientation='vertical' variant='fullWidth' />
        <div className='company-wizard__create-side'>
          <h1>Join</h1>
          <CompanyInvitation {...props} />
        </div>
      </div>
      <div className='company-wizard__footer'>
        <Button
          variant='contained'
          onClick={() => {
            sessionStorage.removeItem('doubletex-app-user-token')
            sessionStorage.removeItem('doubletex-app-user')
            window.location.reload()
          }}>
          Logout
        </Button>
      </div>
    </DbxPanel>
  )
}
