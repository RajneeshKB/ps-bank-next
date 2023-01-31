import React from 'react'
import { fireEvent, render, waitFor, within } from '@testing-library/react'
import { MoneyTransferForm } from '.'

describe('TS:1 - MoneyTransferForm Component', () => {
  const mockHandleTransfer = jest.fn()
  it('TC:01 - should render money ytransfer form successfully', () => {
    const { getByLabelText, getByRole, getAllByRole } = render(
      <MoneyTransferForm
        showPayeeLoader={false}
        onAddPayeeClick={jest.fn()}
        accountsList={[
          { accountNumber: '123', availableBalance: '100' },
          { accountNumber: '456', availableBalance: '500' },
        ]}
        payeeList={[{ accountNumber: '987', beneficiaryName: 'test 1' }]}
        showError={false}
        transferData={{
          transferType: 'within',
          fromAccount: '456',
          toAccount: '123',
          transferAmount: '100',
          transferRemarks: 'test transfer',
        }}
        handleTransferFormChange={mockHandleTransfer}
      />
    )

    expect(getByLabelText(/Transfer Type/)).toBeInTheDocument()
    expect(getAllByRole('radiogroup')).toHaveLength(1)
    expect(getAllByRole('radio')).toHaveLength(2)
    expect(getByLabelText(/Transfer From/)).toBeInTheDocument()
    expect(getByLabelText(/Transfer To/)).toBeInTheDocument()
    expect(getByLabelText(/Amount/)).toBeInTheDocument()
    expect(getByLabelText(/Remarks/)).toBeInTheDocument()

    expect(getByRole('button', { name: 'Proceed' })).toBeDefined()
  })

  it('TC:02 - should render money transfer form with error messages', () => {
    const { getByRole, getAllByText } = render(
      <MoneyTransferForm
        showPayeeLoader
        onAddPayeeClick={jest.fn()}
        accountsList={[
          { accountNumber: '123', availableBalance: '100' },
          { accountNumber: '456', availableBalance: '500' },
        ]}
        payeeList={[{ accountNumber: '987', beneficiaryName: 'test 1' }]}
        showError
        transferData={{
          transferType: '',
          fromAccount: '',
          toAccount: '',
          transferAmount: '',
          transferRemarks: '',
        }}
        handleTransferFormChange={mockHandleTransfer}
      />
    )

    expect(getAllByText(/Required/)).toHaveLength(4)
    expect(getByRole('button', { name: 'Proceed' })).toBeDefined()
  })

  it('TC:03 - should call mocked formsubmit handler on proceed button click and valid form data', async () => {
    const { getByLabelText, getByRole, getAllByRole } = render(
      <MoneyTransferForm
        showPayeeLoader={false}
        onAddPayeeClick={jest.fn()}
        accountsList={[
          { accountNumber: '123', availableBalance: '100' },
          { accountNumber: '456', availableBalance: '500' },
        ]}
        payeeList={[{ accountNumber: '987', beneficiaryName: 'test 1' }]}
        showError={false}
        transferData={{
          transferType: '',
          fromAccount: '',
          toAccount: '',
          transferAmount: '',
          transferRemarks: '',
        }}
        handleTransferFormChange={mockHandleTransfer}
      />
    )

    const transferTypeWithin = getAllByRole('radio')[0]
    const transferFromSelect = getByLabelText(/Transfer From/)
    const transferToSelect = getByLabelText(/Transfer To/)
    const transferAmountBox = getByLabelText(/Amount/)
    const transferRemarksBox = getByLabelText(/Remarks/)
    const proceedBtn = getByRole('button', { name: 'Proceed' })

    fireEvent.click(transferTypeWithin)
    fireEvent.mouseDown(transferFromSelect)
    const fromAccountOptions = within(getByRole('listbox'))
    fireEvent.click(fromAccountOptions.getByText(/456/i))
    fireEvent.mouseDown(transferToSelect)
    const toAccountOptions = within(getByRole('listbox'))
    fireEvent.click(toAccountOptions.getByText(/987/i))
    fireEvent.change(transferAmountBox, { target: { value: '100' } })
    fireEvent.change(transferRemarksBox, { target: { value: 'test transfer' } })
    fireEvent.click(proceedBtn)

    await waitFor(() => {
      expect(mockHandleTransfer).toHaveBeenCalled()
    })
  })
})
