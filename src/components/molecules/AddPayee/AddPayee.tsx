import React, { FC, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Modal,
  Stack,
  TextField,
} from '@mui/material'

interface IAddPayee {
  showModal: boolean
  onSubmitHandler: (_arg1: any) => void
  onCloseHandler: (_arg1: any) => void
}

const AddPayee: FC<IAddPayee> = ({
  showModal,
  onSubmitHandler,
  onCloseHandler,
}) => {
  const [payeeData, updatePayeeData] = useState({
    bankName: '',
    beneficiaryName: '',
    accountNumber: '',
    verifyAccountNumber: '',
  })
  const [showError, updateShowError] = useState(false)
  const handleTransferFormChange = (newVal: string, fieldName: string) => {
    updatePayeeData({
      ...payeeData,
      [fieldName]: newVal,
    })
  }
  const submitTransferForm = (e: any) => {
    e.preventDefault()
    const { bankName, beneficiaryName, accountNumber, verifyAccountNumber } =
      payeeData
    if (
      !bankName ||
      !beneficiaryName ||
      !accountNumber ||
      !verifyAccountNumber
    ) {
      updateShowError(!showError)
    } else if (accountNumber !== verifyAccountNumber) {
      updateShowError(!showError)
    } else {
      const finalFormData = { bankName, accountNumber, beneficiaryName }
      onSubmitHandler(finalFormData)
    }
  }

  return (
    <Modal
      open={showModal}
      aria-label="beneficiary addition form"
      onClose={onCloseHandler}
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '1.5rem',
          width: { md: '50%', xs: '90%' },
        }}
      >
        <CardContent>
          <Box
            component="form"
            onSubmit={submitTransferForm}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={4}>
              <FormControl fullWidth>
                <TextField
                  id="bankName"
                  name="bankName"
                  label="Bank Name"
                  required
                  onChange={(e) => {
                    handleTransferFormChange(e.target.value, 'bankName')
                  }}
                  variant="standard"
                  value={payeeData.bankName}
                  type="text"
                  error={showError && !payeeData.bankName}
                />
                {showError && !payeeData.bankName && (
                  <FormHelperText error>Required</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="beneficiaryName"
                  name="beneficiaryName"
                  label="Payee Name"
                  required
                  onChange={(e) => {
                    handleTransferFormChange(e.target.value, 'beneficiaryName')
                  }}
                  variant="standard"
                  value={payeeData.beneficiaryName}
                  type="text"
                  error={showError && !payeeData.beneficiaryName}
                />
                {showError && !payeeData.beneficiaryName && (
                  <FormHelperText error>Required</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="accountNumber"
                  name="accountNumber"
                  label="Account Number"
                  required
                  onChange={(e) => {
                    handleTransferFormChange(e.target.value, 'accountNumber')
                  }}
                  variant="standard"
                  value={payeeData.accountNumber}
                  type="password"
                  error={showError && !payeeData.accountNumber}
                />
                {showError && !payeeData.accountNumber && (
                  <FormHelperText error>Required</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="verifyAccountNumber"
                  name="verifyAccountNumber"
                  label="Re-enter Account Number"
                  required
                  onChange={(e) => {
                    handleTransferFormChange(
                      e.target.value,
                      'verifyAccountNumber'
                    )
                  }}
                  variant="standard"
                  value={payeeData.verifyAccountNumber}
                  type="text"
                  error={showError && !payeeData.verifyAccountNumber}
                />
                {showError && !payeeData.verifyAccountNumber && (
                  <FormHelperText error>Required</FormHelperText>
                )}
                {showError &&
                  payeeData.accountNumber !== payeeData.verifyAccountNumber && (
                    <FormHelperText error>
                      Account number mismatch
                    </FormHelperText>
                  )}
              </FormControl>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ padding: '1rem 0', width: '8rem' }}
                  onClick={onCloseHandler}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ padding: '1rem 0', width: '8rem' }}
                  type="submit"
                >
                  Add Payee
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default AddPayee
