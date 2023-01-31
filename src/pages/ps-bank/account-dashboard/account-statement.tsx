import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Box, Stack, Typography } from '@mui/material'
import { Control, useForm } from 'react-hook-form'
import { useBankContext } from '../../../context'
import { GET_ACCOUNTS } from '../../../graphql/queries'
import {
  BANK_ACCOUNT,
  getItemFromSession,
  getTransactionFilterFormControlValues,
  ITransactionFilterForm,
  TRANSACTION_FILTER_FORM,
  TRANSACTION_FILTER_FORM_DEFAULT_VALUES,
} from '../../../utils'
import { ViewLoader } from '@/components/atoms/ViewLoader'
import { FormBuilder } from '@/components/organisms/FormBuilder'
import { TransactionsList } from '@/components/organisms/AccountTransactions'
import { ProtectedLayout } from '@/components/organisms/ProtectedLayout'

type FormProps = {
  control: Control<ITransactionFilterForm>
  handleSubmit: any
  watch: any
}

const AccountStatement: FC = () => {
  const [filterData, updateFilterData] = useState<any>(null)
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()
  const selectedAccount = getItemFromSession('selectedAccount') || ''

  const { loading, error, data } = useQuery(GET_ACCOUNTS, {
    variables: { customerId },
  })

  const defaultFormValues = {
    ...TRANSACTION_FILTER_FORM_DEFAULT_VALUES,
    [BANK_ACCOUNT]: selectedAccount,
  }
  const { control, handleSubmit, watch }: FormProps =
    useForm<ITransactionFilterForm>({
      defaultValues: defaultFormValues,
    })

  const fetchTransactions = (formData: ITransactionFilterForm) => {
    const {
      fromDate,
      selectedAccount: accountNumber,
      toDate,
      transactionListFilterOption,
    } = formData

    if (transactionListFilterOption === 'dateRange' && (!fromDate || !toDate))
      return

    let variableInputs = {}
    if (transactionListFilterOption === 'dateRange') {
      variableInputs = {
        customerId,
        accountNumber: accountNumber.toString(),
        lastTenTransactions: false,
        fromDate,
        toDate,
      }
    } else {
      variableInputs = {
        customerId,
        accountNumber: accountNumber.toString(),
      }
    }
    updateFilterData(variableInputs)
  }

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
        <h2>Error occured while fetching accounts. Try again!</h2>
      </ProtectedLayout>
    )
  }

  /* istanbul ignore next */
  if (!data?.getAccounts?.length) return null

  return (
    <ProtectedLayout>
      <Box>
        <Typography variant="h2">Account Statement</Typography>
        <Stack my="1rem">
          <Box sx={{ border: '1px solid', p: '1rem' }}>
            <FormBuilder
              formControls={TRANSACTION_FILTER_FORM}
              controlHook={control}
              watchHook={watch}
              controlValues={getTransactionFilterFormControlValues(
                data.getAccounts
              )}
              submitHandler={handleSubmit(fetchTransactions)}
              submitButtonLabel="View transactions"
            />
          </Box>
        </Stack>
        {filterData && <TransactionsList filterData={filterData} />}
      </Box>
    </ProtectedLayout>
  )
}

export default AccountStatement
