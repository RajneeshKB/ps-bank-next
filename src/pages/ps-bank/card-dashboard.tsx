import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useBankContext } from '@/context'
import { GET_CREDIT_CARDS } from '@/graphql/queries'
import { ViewLoader } from '@/components/atoms/ViewLoader'
import { Cards } from '@/components/organisms/Cards'
import { ProtectedLayout } from '@/components/organisms/ProtectedLayout'

const CardsDashboard: FC = () => {
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()

  const { loading, error, data } = useQuery(GET_CREDIT_CARDS, {
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
        <h2>Error occured while fetching card. Try again!</h2>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <Cards cardsList={data} />
    </ProtectedLayout>
  )
}

export default CardsDashboard
