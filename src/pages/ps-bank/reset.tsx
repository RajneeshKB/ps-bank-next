import React, { FC } from 'react'
import { Control, useForm } from 'react-hook-form'
import { useLazyQuery } from '@apollo/client'
import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useBankContext } from '@/context'
import { getItemFromSession, IS_BROWSER, PASSWORD_RESET_FORM } from '@/utils'
import { RESET_PASSWORD } from '@/graphql/queries'
import { logoutCustomer } from '@/context/actions'
import { ViewLoader } from '@/components/atoms/ViewLoader'
import { FormBuilder } from '@/components/organisms/FormBuilder'
import { GenericErrorModal } from '@/components/molecules/GenericErrorModal'
import { SuccessModal } from '@/components/molecules/SuccessModal'
import { ProtectedLayout } from '@/components/organisms/ProtectedLayout'

type PasswordResetFormInputs = {
  customerId: string
  oldPassword: string
  password: string
}
type FormProps = {
  control: Control<PasswordResetFormInputs>
  handleSubmit: any
}

const passwordResetStyles = {
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

const initialStateValue = {
  customerId: '',
  oldPassword: '',
  newPassword: '',
}

const PasswordReset: FC = () => {
  const { dispatch } = useBankContext()
  const { AccessToken = '' } = IS_BROWSER ? sessionStorage : {}
  const customerDetails = getItemFromSession('customerData')
  const router = useRouter()

  const { control, handleSubmit }: FormProps = useForm<PasswordResetFormInputs>(
    {
      defaultValues: {
        ...initialStateValue,
        customerId: customerDetails?.customerId || '',
      },
    }
  )
  const [resetLoginPassword, { loading, error, data }] =
    useLazyQuery(RESET_PASSWORD)

  const closeModalAndNavigate = () => {
    dispatch(logoutCustomer())
    if (IS_BROWSER) router.push('/')
  }
  const registerUser = (formData: PasswordResetFormInputs) => {
    resetLoginPassword({
      variables: { input: formData },
      fetchPolicy: 'no-cache',
    })
  }

  if (!AccessToken || !customerDetails?.customerId) {
    if (IS_BROWSER) router.push('/')
    return null
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <ViewLoader label="Password reset in progress, please wait!" />
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <Paper sx={passwordResetStyles.formWrapper}>
        <Card sx={passwordResetStyles.cardWrapper}>
          <CardContent>
            <Typography variant="h2" color="primary.dark">
              Reset your password
            </Typography>
            <Divider variant="fullWidth" sx={passwordResetStyles.divider} />
            <FormBuilder
              formControls={PASSWORD_RESET_FORM}
              controlHook={control}
              submitHandler={handleSubmit(registerUser)}
              submitButtonLabel="reset password"
            />
          </CardContent>
        </Card>
        {error && (
          <GenericErrorModal showModal onCloseClick={closeModalAndNavigate} />
        )}
        {data && (
          <SuccessModal
            showModal
            onCloseClick={closeModalAndNavigate}
            title={
              <Typography variant="h2">Password reset completed.</Typography>
            }
            description={
              <Typography variant="body1">
                Password updated successfully. Login again with new password to
                continue with your digital account.
              </Typography>
            }
          />
        )}
      </Paper>
    </ProtectedLayout>
  )
}

export default PasswordReset
