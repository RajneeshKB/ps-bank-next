import { ViewLoader } from '@/components/atoms/ViewLoader'
import { FormBuilder } from '@/components/organisms/FormBuilder'
import { UnprotectedLayout } from '@/components/organisms/UnprotectedLayout'
import { useBankContext } from '@/context'
import { setLoginData } from '@/context/actions'
import { LOGIN_CUSTOMER } from '@/graphql/queries'
import { LOGIN_FORM } from '@/utils'
import { useLazyQuery } from '@apollo/client'
import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Control, useForm } from 'react-hook-form'

type LoginFormInputs = {
  customerId: string
  password: string
}
type FormProps = {
  control: Control<LoginFormInputs>
  handleSubmit: any
}

const initialStateValue = {
  customerId: '',
  password: '',
}

const loginStyles = {
  formWrapper: {
    backgroundColor: '#e2e2e2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10rem 0',
  },
  cardWrapper: {
    padding: '2rem',
  },
  divider: {
    margin: '0.5rem 0 1rem',
    borderBottomWidth: '2px',
    borderColor: '#999',
  },
}

const CustomerLogin: FC = () => {
  const { control, handleSubmit }: FormProps = useForm<LoginFormInputs>({
    defaultValues: initialStateValue,
  })
  const [loginCustomer, { loading, error }] = useLazyQuery(LOGIN_CUSTOMER)
  const {
    dispatch,
    state: {
      loginData: { AccessToken, customerId, isNewUser },
    },
  } = useBankContext()
  const router = useRouter()
  const registerUser = (formData: LoginFormInputs) => {
    loginCustomer({
      variables: { input: formData },
      fetchPolicy: 'no-cache',
      onCompleted: (response) => {
        dispatch(setLoginData({ ...response.loginCustomer }))
      },
    })
  }

  if (loading) {
    return (
      <UnprotectedLayout>
        <ViewLoader label="Customer login in progress, please wait!" />
      </UnprotectedLayout>
    )
  }
  if (AccessToken && customerId) {
    const navigatePath = isNewUser
      ? '/ps-bank/reset'
      : '/ps-bank/account-dashboard'
    router.push(navigatePath)
    return null
  }

  return (
    <UnprotectedLayout>
      <Paper sx={loginStyles.formWrapper}>
        <Card sx={loginStyles.cardWrapper}>
          <CardContent>
            {error?.message && (
              <Typography variant="caption" color="error" mb="2rem">
                Customer Id / Password is incorrect
              </Typography>
            )}
            <Typography variant="h2" color="primary.dark">
              Login to world of digital banking
            </Typography>
            <Divider variant="fullWidth" sx={loginStyles.divider} />
            <FormBuilder
              formControls={LOGIN_FORM}
              controlHook={control}
              submitHandler={handleSubmit(registerUser)}
              submitButtonLabel="login"
            />
          </CardContent>
        </Card>
      </Paper>
    </UnprotectedLayout>
  )
}

export default CustomerLogin
