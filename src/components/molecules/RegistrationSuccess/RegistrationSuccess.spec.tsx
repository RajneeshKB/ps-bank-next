import React from 'react'
import { render } from '@testing-library/react'
import { RegistrationSuccess } from '.'

describe('TS:1 - RegistrationSuccess Component', () => {
  it('TC:01 - should render success modal successfully', () => {
    const { getByText, getByRole } = render(
      <RegistrationSuccess
        customerData={{ createCustomer: { customerName: 'Test User' } }}
        showModal
        onCloseClick={jest.fn()}
      />
    )
    expect(getByText(/You're all set/)).toBeInTheDocument()
    expect(getByText(/Happy banking!/)).toBeInTheDocument()
    expect(getByRole('button', { name: 'Close' })).toBeDefined()
  })
})
