import React, { FC, useState } from 'react'
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material'
import { CreditCardApplication } from '@/components/organisms/CreditCardApplication'
import { ProtectedLayout } from '@/components/organisms/ProtectedLayout'

const newCreditCardStyles = {
  formWrapper: {
    backgroundColor: '#e2e2e2',
    display: 'flex',
    justifyContent: 'center',
  },
  cardWrapper: {
    padding: '2rem',
    // maxWidth: '35rem',
  },
  divider: {
    margin: '0.5rem 0 2rem',
    borderBottomWidth: '2px',
    borderColor: '#999',
  },
}

const NewSavingAccount: FC = () => {
  const [showToast, updateShowToast] = useState({
    display: false,
    success: '',
  })
  const toggleShowToast = (isSuccess: boolean) => {
    updateShowToast({
      display: !showToast.display,
      success: isSuccess ? 'SUCCESS' : 'FAILURE',
    })
  }
  const onToastClose = () => {
    updateShowToast({ display: false, success: '' })
  }
  const onCompletion = (_type: string) => {
    if (_type === 'SUCCESS') {
      toggleShowToast(true)
    } else if (_type === 'FAILURE') {
      toggleShowToast(false)
    }
  }

  return (
    <ProtectedLayout>
      <Paper sx={newCreditCardStyles.formWrapper}>
        {showToast.success && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            key="topright"
            open={showToast.display}
            autoHideDuration={8000}
            onClose={onToastClose}
          >
            <Alert
              onClose={onToastClose}
              severity={showToast.success === 'SUCCESS' ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              <AlertTitle>
                {showToast.success === 'SUCCESS' ? 'Success' : 'Error'}
              </AlertTitle>
              {showToast.success === 'SUCCESS'
                ? 'Woohoo, New credit card issued successfully.'
                : 'Oops, Failed to apply for new credit card. Try again!'}
            </Alert>
          </Snackbar>
        )}
        <Card sx={newCreditCardStyles.cardWrapper}>
          <CardHeader
            title={
              <Box>
                <Typography
                  variant="h2"
                  color="primary.dark"
                  textAlign="center"
                >
                  New Credit Card Application
                </Typography>
                <Typography
                  variant="body1"
                  color="primary.dark"
                  textAlign="center"
                >
                  Please fill in details below and continue.
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <CreditCardApplication onApplicationCompletion={onCompletion} />
          </CardContent>
        </Card>
      </Paper>
    </ProtectedLayout>
  )
}

export default NewSavingAccount
