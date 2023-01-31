import React, { FC } from 'react'
import { AccountsEnrollment } from '@/components/organisms/AccountsEnrollment'
import { ProtectedLayout } from '@/components/organisms/ProtectedLayout'

const NewApplication: FC = () => (
  <ProtectedLayout>
    <AccountsEnrollment />
  </ProtectedLayout>
)

export default NewApplication
