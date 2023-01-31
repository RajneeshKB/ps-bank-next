import { IS_BROWSER } from '@/utils'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useBankContext } from '../../../context'
import { setLoginData } from '../../../context/actions'
import { useAuth } from '../../../hooks/useAuth'
import { PageLayout } from '../PageLayout'

interface IProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout: FC<IProtectedLayoutProps> = ({ children }) => {
  const { dispatch } = useBankContext()
  const authInfo = useAuth()
  const router = useRouter()
  const { validContext, customerId, customerName, isNewUser, AccessToken } =
    authInfo

  useEffect(() => {
    if (!validContext) {
      dispatch(
        setLoginData({ customerId, customerName, isNewUser, AccessToken })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authInfo])

  if (!AccessToken) {
    // eslint-disable-next-line no-console
    console.log('user not authorized')
    if (IS_BROWSER) router.push('/')
    return null
  }

  if (!validContext) {
    return (
      <Stack>
        <CircularProgress />
        <Typography variant="caption">Loading data, please wait!</Typography>
      </Stack>
    )
  }
  /* istanbul ignore next */
  if (router.pathname === '/ps-bank' || router.pathname === '/ps-bank/') {
    const navigatePath = isNewUser
      ? '/ps-bank/reset'
      : '/ps-bank/account-dashboard'
    if (IS_BROWSER) router.push(navigatePath)
    return null
  }

  return <PageLayout>{children}</PageLayout>
}

export default ProtectedLayout
