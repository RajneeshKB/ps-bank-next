import React, { FC, useState } from 'react'
import { Card, CardContent, Divider, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useBankContext } from '@/context'
import { logoutCustomer } from '@/context/actions'
import { RegistrationSuccess } from '@/components/molecules/RegistrationSuccess'
import { GenericErrorModal } from '@/components/molecules/GenericErrorModal'
import { UserRegistrationDetailsForm } from '@/components/organisms/UserRegistrationDetailed'
import { IS_BROWSER } from '@/utils'
import { UnprotectedLayout } from '@/components/organisms/UnprotectedLayout'

const registrationDetailsStyles = {
  formWrapper: {
    backgroundColor: '#e2e2e2',
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem 0',
  },
  cardWrapper: {
    padding: '2rem',
    maxWidth: '35rem',
  },
  divider: {
    margin: '0.5rem 0 1rem',
    borderBottomWidth: '2px',
    borderColor: '#999',
  },
}

const CustomerRegistration: FC = () => {
  const [regResponse, updateRegResponse] = useState({ data: {}, error: {} })
  const [showModal, toggleShowModal] = useState(false)
  const router = useRouter()
  const {
    dispatch,
    state: { registrationData },
  } = useBankContext()

  const toggleModalView = () => toggleShowModal(!showModal)
  const closeModalAndNavigate = () => {
    toggleModalView()
    dispatch(logoutCustomer())
    if (IS_BROWSER) router.push('/')
  }
  const registrationCompletionHandler = ({ data, error }: any) => {
    updateRegResponse({ data, error })
    toggleModalView()
  }
  if (!registrationData?.customerName) {
    if (IS_BROWSER) router.push('/')
    return null
  }
  return (
    <UnprotectedLayout>
      <Paper sx={registrationDetailsStyles.formWrapper}>
        <Card sx={registrationDetailsStyles.cardWrapper}>
          <CardContent>
            <Typography variant="h2" color="primary.dark">
              Just one more step to get started with your digital banking
              account
            </Typography>
            <Divider
              variant="fullWidth"
              sx={registrationDetailsStyles.divider}
            />
            <UserRegistrationDetailsForm
              basicRegistrationData={registrationData}
              formSubmitCallback={registrationCompletionHandler}
            />
          </CardContent>
        </Card>
        {showModal &&
          (regResponse?.data ? (
            <RegistrationSuccess
              customerData={regResponse.data}
              showModal={showModal}
              onCloseClick={closeModalAndNavigate}
            />
          ) : (
            <GenericErrorModal
              showModal={showModal}
              onCloseClick={closeModalAndNavigate}
            />
          ))}
      </Paper>
    </UnprotectedLayout>
  )
}

export default CustomerRegistration
