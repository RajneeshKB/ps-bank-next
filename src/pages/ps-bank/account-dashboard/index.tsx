import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../../../graphql/queries'
import { useBankContext } from '../../../context'
import { ViewLoader } from '@/components/atoms/ViewLoader'
import { AccountsList } from '@/components/organisms/Accounts'
import { ProtectedLayout } from '@/components/organisms/ProtectedLayout'

const AccountsDashboard: FC = () => {
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()
  const { loading, error, data } = useQuery(GET_ACCOUNTS, {
    variables: { customerId },
  })

  if (loading) {
    return (
      <ProtectedLayout>
        <ViewLoader />
      </ProtectedLayout>
    )
  }
  if (error) {
    return (
      <ProtectedLayout>
        <h2>Error occured while fetching accounts. Try again!</h2>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <AccountsList accountsData={data} />
    </ProtectedLayout>
  )
}

export default AccountsDashboard
