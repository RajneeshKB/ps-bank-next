import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { UserRegistrationBasicForm } from '.'

const mockData = { mockNavigate: jest.fn() }

describe('TS:1 - UserRegistrationBasicForm component', () => {
  it('TC:01 - should render UserRegistrationBasicForm Component successfully', () => {
    const { getByText, getAllByRole, getByLabelText } = renderWithRouter(
      <UserRegistrationBasicForm />
    )
    expect(getByText(/Let's get started/)).toBeInTheDocument()
    expect(getAllByRole('textbox')).toHaveLength(3)
    expect(getByLabelText('Your Full Name *')).toBeInTheDocument()
    expect(getByLabelText('Mobile number *')).toBeInTheDocument()
    expect(getByLabelText('Email *')).toBeInTheDocument()
  })

  it('TC:02 - should not call navigate function on if form is not valid when submitted', async () => {
    jest.spyOn(mockData, 'mockNavigate')
    const { getByRole } = renderWithRouter(<UserRegistrationBasicForm />)
    const submitButton = getByRole('button', { name: 'Register' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockData.mockNavigate).not.toHaveBeenCalled()
    })
  })

  xit('TC:03 - should call navigate function on if form is valid when submitted', async () => {
    jest.spyOn(mockData, 'mockNavigate')
    const { getByRole, getByLabelText } = renderWithRouter(
      <UserRegistrationBasicForm />
    )
    const nameBox = getByLabelText('Your Full Name *')
    const numberBox = getByLabelText('Mobile number *')
    const emailBox = getByLabelText('Email *')

    fireEvent.change(nameBox, { target: { value: 'Test name' } })
    fireEvent.change(numberBox, { target: { value: '7893452345' } })
    fireEvent.change(emailBox, { target: { value: 'test@test.com' } })

    const submitButton = getByRole('button', { name: 'Register' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockData.mockNavigate).toHaveBeenCalled()
    })
  })
})
