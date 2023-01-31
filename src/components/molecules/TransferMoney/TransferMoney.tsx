import React, { FC, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { MoneyTransferForm } from '../MoneyTransferForm'

interface ITransferForm {
  accountsList: any[]
  beneficiaryList: any[]
  showPayeeLoader: boolean
  onSubmitHandler: (_arg1: any) => void
  onAddPayeeClick: () => void
}
const defaultTransferData = {
  transferType: 'within',
  fromAccount: '',
  toAccount: '',
  transferAmount: '',
  transferRemarks: '',
}
const TransferForm: FC<ITransferForm> = ({
  accountsList,
  beneficiaryList,
  showPayeeLoader,
  onSubmitHandler,
  onAddPayeeClick,
}) => {
  const [transferData, updateTransferData] = useState(defaultTransferData)
  const [showError, updateShowError] = useState(false)
  const [payeeList, updatePayeeList] = useState(accountsList)
  const handleTransferFormChange = (newVal: string, fieldName: string) => {
    if (fieldName === 'transferType') {
      updateTransferData({
        ...defaultTransferData,
        [fieldName]: newVal,
      })
    } else if (
      fieldName === 'fromAccount' &&
      transferData.transferType === 'within'
    ) {
      const filteredData = accountsList.filter(
        (account) => account.accountNumber !== newVal
      )
      updatePayeeList(filteredData)
      updateTransferData({
        ...transferData,
        [fieldName]: newVal,
      })
    } else {
      updateTransferData({
        ...transferData,
        [fieldName]: newVal,
      })
    }
  }
  const submitTransferForm = (e: any) => {
    e.preventDefault()
    const { fromAccount, toAccount, transferAmount } = transferData
    if (fromAccount && toAccount && transferAmount) {
      onSubmitHandler(transferData)
    } else {
      updateShowError(!showError)
    }
  }

  useEffect(() => {
    if (transferData.transferType === 'within') {
      updatePayeeList(accountsList)
    } else {
      updatePayeeList(beneficiaryList)
    }
  }, [transferData.transferType, accountsList, beneficiaryList])

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitTransferForm}
    >
      <MoneyTransferForm
        accountsList={accountsList}
        payeeList={payeeList}
        showError={showError}
        transferData={transferData}
        showPayeeLoader={showPayeeLoader}
        onAddPayeeClick={onAddPayeeClick}
        handleTransferFormChange={handleTransferFormChange}
      />
    </Box>
  )
}

export default TransferForm
