import React, { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import { SuccessModal } from '../SuccessModal'

interface IRegistrationSuccessProps {
  customerData: any
  showModal: boolean
  onCloseClick: () => void
}

const RegistrationSuccess: FC<IRegistrationSuccessProps> = ({
  customerData,
  showModal,
  onCloseClick,
}) => {
  const {
    createCustomer: { customerName, customerId },
  } = customerData

  const modalProps = {
    showModal,
    onCloseClick,
    title: <Typography variant="h2">You&apos;re all set</Typography>,
    description: (
      <Stack spacing={2}>
        <Typography variant="body1">
          {`Thanks you ${customerName} for registering with us. We will take maximum 24-48
    hours to verify your details, and post verification we will inform
    you on your registered mail along with customer ID and one-time
    password.`}
        </Typography>
        <Typography variant="body2">{`Mail integration is in progress, for now use ${customerId} with default password to login.`}</Typography>
        <Typography variant="body1">
          Update your default password on first login and use your login
          credentials to open an digital account with us and give us serve you
          better.
        </Typography>
        <Typography variant="caption">Happy banking!</Typography>
      </Stack>
    ),
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SuccessModal {...modalProps} />
}

export default RegistrationSuccess
