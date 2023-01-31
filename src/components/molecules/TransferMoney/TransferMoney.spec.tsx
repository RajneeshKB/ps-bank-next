import React from 'react'
import { fireEvent, render, waitFor, within } from '@testing-library/react'
import { TransferMoney } from '.'

describe('TS:1 - TransferMoney Component', () => {
  const mockSubmitHandler = jest.fn()
  it('TC:01 - should render money transfer form successfully and call mock submithanlder on form submit', async () => {
    const { getByLabelText, getByRole, getAllByRole } = render(
      <TransferMoney
        showPayeeLoader={false}
        onAddPayeeClick={jest.fn()}
        accountsList={[
          { accountNumber: '123', availableBalance: '100' },
          { accountNumber: '456', availableBalance: '500' },
        ]}
        beneficiaryList={[{ accountNumber: '987', beneficiaryName: 'test 1' }]}
        onSubmitHandler={mockSubmitHandler}
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
    fireEvent.click(toAccountOptions.getByText(/123/i))
    fireEvent.change(transferAmountBox, { target: { value: '100' } })
    fireEvent.change(transferRemarksBox, { target: { value: 'test transfer' } })
    fireEvent.click(proceedBtn)

    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalled()
    })
  })

  it('TC:02 - should show error if form is not valid', async () => {
    const { getByLabelText, getByRole, getAllByRole, getByText } = render(
      <TransferMoney
        showPayeeLoader={false}
        onAddPayeeClick={jest.fn()}
        accountsList={[
          { accountNumber: '123', availableBalance: '100' },
          { accountNumber: '456', availableBalance: '500' },
        ]}
        beneficiaryList={[{ accountNumber: '987', beneficiaryName: 'test 1' }]}
        onSubmitHandler={mockSubmitHandler}
      />
    )

    const transferTypeWithin = getAllByRole('radio')[0]
    const transferFromSelect = getByLabelText(/Transfer From/)
    const transferToSelect = getByLabelText(/Transfer To/)
    const proceedBtn = getByRole('button', { name: 'Proceed' })

    fireEvent.click(transferTypeWithin)
    fireEvent.mouseDown(transferFromSelect)
    const fromAccountOptions = within(getByRole('listbox'))
    fireEvent.click(fromAccountOptions.getByText(/456/i))
    fireEvent.mouseDown(transferToSelect)
    const toAccountOptions = within(getByRole('listbox'))
    fireEvent.click(toAccountOptions.getByText(/123/i))
    fireEvent.click(proceedBtn)

    await waitFor(() => {
      expect(getByText(/Required/)).toBeInTheDocument()
    })
  })

  it('TC:03 - should show transfer form with outside beneficieriesa and call mocked submit handler after filling form', async () => {
    const { getByLabelText, getByRole, getAllByRole } = render(
      <TransferMoney
        showPayeeLoader={false}
        onAddPayeeClick={jest.fn()}
        accountsList={[
          { accountNumber: '123', availableBalance: '100' },
          { accountNumber: '456', availableBalance: '500' },
        ]}
        beneficiaryList={[{ accountNumber: '987', beneficiaryName: 'test 1' }]}
        onSubmitHandler={mockSubmitHandler}
      />
    )

    const transferTypeWithin = getAllByRole('radio')[1]
    const transferFromSelect = getByLabelText(/Transfer From/)
    const transferToSelect = getByLabelText(/Transfer To/)
    const transferAmountBox = getByLabelText(/Amount/)
    const proceedBtn = getByRole('button', { name: 'Proceed' })

    fireEvent.click(transferTypeWithin)
    fireEvent.mouseDown(transferFromSelect)
    const fromAccountOptions = within(getByRole('listbox'))
    fireEvent.click(fromAccountOptions.getByText(/456/i))
    fireEvent.mouseDown(transferToSelect)
    const toAccountOptions = within(getByRole('listbox'))
    fireEvent.click(toAccountOptions.getByText(/987/i))
    fireEvent.change(transferAmountBox, { target: { value: '100' } })
    fireEvent.click(proceedBtn)

    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalled()
    })
  })
})
