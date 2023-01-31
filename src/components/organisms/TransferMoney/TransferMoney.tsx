import React, { FC, useState } from 'react'
import {
  Alert,
  AlertTitle,
  Box,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { useBankContext } from '../../../context'
import {
  ADD_PAYEE,
  GET_ACCOUNTS,
  GET_ALL_ACCOUNTS_AND_BENEFICIARIES,
  TRANSFER_MONEY,
} from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'
import { TransferMoney } from '@/components/molecules/TransferMoney'
import { AddPayeeModal } from '@/components/molecules/AddPayee'

const TransferMoeny: FC = () => {
  const [showModal, updateShowModal] = useState(false)
  const [showToast, updateShowToast] = useState({
    display: false,
    success: '',
  })
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()
  const { loading, data, error } = useQuery(
    GET_ALL_ACCOUNTS_AND_BENEFICIARIES,
    {
      variables: { customerId },
    }
  )
  const [addPayee, { loading: addingPayee }] = useMutation(ADD_PAYEE, {
    refetchQueries: [
      { query: GET_ALL_ACCOUNTS_AND_BENEFICIARIES, variables: { customerId } },
    ],
  })
  const [transferMoney, { loading: transferringMoney }] = useMutation(
    TRANSFER_MONEY,
    {
      refetchQueries: [
        {
          query: GET_ALL_ACCOUNTS_AND_BENEFICIARIES,
          variables: { customerId },
        },
        { query: GET_ACCOUNTS, variables: { customerId } },
      ],
    }
  )
  const toggleShowToast = (isSuccess: boolean) => {
    updateShowToast({
      display: !showToast.display,
      success: isSuccess ? 'SUCCESS' : 'FAILURE',
    })
  }
  const onToastClose = () => {
    updateShowToast({ display: false, success: '' })
  }

  const { getAccounts: accountList, getAllBeneficiaries: payeeList } =
    data || {}

  const toggleShowModal = () => {
    updateShowModal(!showModal)
  }
  const initiateAmountTransfer = (formData: any) => {
    transferMoney({
      variables: {
        input: { ...formData, customerId },
      },
      onCompleted: () => {
        toggleShowToast(true)
      },
      onError: () => {
        toggleShowToast(false)
      },
    })
  }
  const initiatePayeeAddition = (formData: any) => {
    addPayee({
      variables: {
        input: { ...formData, customerId },
      },
      onCompleted: () => {
        toggleShowToast(true)
      },
      onError: () => {
        toggleShowToast(false)
      },
    })
    toggleShowModal()
  }
  if (loading) {
    return <ViewLoader />
  }
  /* istanbul ignore next */
  if (error) {
    return (
      <Typography variant="h3">
        Error occured while fetching accounts data
      </Typography>
    )
  }
  /* istanbul ignore else */
  if (accountList?.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <Stack
          p={8}
          maxWidth="50rem"
          width="40rem"
          border="1px solid"
          borderRadius={4}
        >
          {transferringMoney ? (
            <ViewLoader />
          ) : (
            <TransferMoney
              accountsList={accountList}
              beneficiaryList={payeeList}
              showPayeeLoader={addingPayee}
              onSubmitHandler={initiateAmountTransfer}
              onAddPayeeClick={toggleShowModal}
            />
          )}
        </Stack>
        {showModal && (
          <AddPayeeModal
            showModal={showModal}
            onSubmitHandler={initiatePayeeAddition}
            onCloseHandler={toggleShowModal}
          />
        )}
        {showToast.display && (
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
                ? 'Operation successfull'
                : 'Oops, Operation failed. Try again!'}
            </Alert>
          </Snackbar>
        )}
      </Box>
    )
  }
  /* istanbul ignore next */
  return null
}

export default TransferMoeny
