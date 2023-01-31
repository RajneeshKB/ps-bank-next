import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useBankContext } from '../../../context'
import { PageLayout } from '../PageLayout'

interface IUnprotectedLayoutProps {
  children: React.ReactNode
}
const UnprotectedLayout: FC<IUnprotectedLayoutProps> = ({ children }) => {
  const {
    state: {
      loginData: { AccessToken, customerId, isNewUser },
    },
  } = useBankContext()
  const router = useRouter()

  if (AccessToken && customerId) {
    const navigatePath = isNewUser
      ? '/ps-bank/reset'
      : '/ps-bank/account-dashboard'
    router.push(navigatePath)
    return null
  }

  return <PageLayout>{children}</PageLayout>
}

export default UnprotectedLayout
