import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { AddPayeeModal } from '.'

describe('TS:1 - AddPayeeModal Component', () => {
  const mockProps = {
    submitHandlerMock: jest.fn(),
    closeHandlerMock: jest.fn(),
  }

  it('TC:01 - should render add payee modal successfully', () => {
    const { getByLabelText, getByRole, getAllByLabelText } = render(
      <AddPayeeModal
        showModal
        onSubmitHandler={mockProps.submitHandlerMock}
        onCloseHandler={mockProps.closeHandlerMock}
      />
    )
    expect(getByLabelText(/Bank Name/)).toBeInTheDocument()
    expect(getByLabelText(/Payee Name/)).toBeInTheDocument()
    expect(getAllByLabelText(/Account Number/, { exact: true })).toHaveLength(2)
    expect(getByLabelText(/Re-enter Account Number/)).toBeInTheDocument()

    expect(getByRole('button', { name: 'Cancel' })).toBeDefined()
    expect(getByRole('button', { name: 'Add Payee' })).toBeDefined()
  })

  it('TC:02 - should show error messages if form is not filled and trying to submit', async () => {
    const { getByLabelText, getByRole, getAllByLabelText, queryAllByText } =
      render(
        <AddPayeeModal
          showModal
          onSubmitHandler={mockProps.submitHandlerMock}
          onCloseHandler={mockProps.closeHandlerMock}
        />
      )
    expect(getByLabelText(/Bank Name/)).toBeInTheDocument()
    expect(getByLabelText(/Payee Name/)).toBeInTheDocument()
    expect(getAllByLabelText(/Account Number/, { exact: true })).toHaveLength(2)
    expect(getByLabelText(/Re-enter Account Number/)).toBeInTheDocument()

    const addBtn = getByRole('button', { name: 'Add Payee' })
    fireEvent.click(addBtn)

    await waitFor(() => {
      expect(queryAllByText(/Required/)).toHaveLength(4)
    })
  })

  it('TC:03 - should show error message if account number is not matching', async () => {
    const { getByLabelText, getByRole, getAllByLabelText, getByText } = render(
      <AddPayeeModal
        showModal
        onSubmitHandler={mockProps.submitHandlerMock}
        onCloseHandler={mockProps.closeHandlerMock}
      />
    )
    const bankNameBox = getByLabelText(/Bank Name/)
    const payeeNameBox = getByLabelText(/Payee Name/)
    const accNumberBox = getAllByLabelText(/Account Number/)[0]
    const confirmAccNoBox = getByLabelText(/Re-enter Account Number/)

    fireEvent.change(bankNameBox, { target: { value: 'test bank' } })
    fireEvent.change(payeeNameBox, { target: { value: 'new payee' } })
    fireEvent.change(accNumberBox, { target: { value: '12345' } })
    fireEvent.change(confirmAccNoBox, { target: { value: '123' } })

    const addBtn = getByRole('button', { name: 'Add Payee' })
    fireEvent.click(addBtn)

    await waitFor(() => {
      expect(getByText(/Account number mismatch/)).toBeInTheDocument()
    })
  })

  it('TC:04 - should call mock submit handler on valid form submit', async () => {
    const { getByLabelText, getByRole, getAllByLabelText } = render(
      <AddPayeeModal
        showModal
        onSubmitHandler={mockProps.submitHandlerMock}
        onCloseHandler={mockProps.closeHandlerMock}
      />
    )
    const bankNameBox = getByLabelText(/Bank Name/)
    const payeeNameBox = getByLabelText(/Payee Name/)
    const accNumberBox = getAllByLabelText(/Account Number/)[0]
    const confirmAccNoBox = getByLabelText(/Re-enter Account Number/)

    fireEvent.change(bankNameBox, { target: { value: 'test bank' } })
    fireEvent.change(payeeNameBox, { target: { value: 'new payee' } })
    fireEvent.change(accNumberBox, { target: { value: '12345' } })
    fireEvent.change(confirmAccNoBox, { target: { value: '12345' } })

    const addBtn = getByRole('button', { name: 'Add Payee' })
    fireEvent.click(addBtn)

    await waitFor(() => {
      expect(mockProps.submitHandlerMock).toHaveBeenCalled()
    })
  })
})
