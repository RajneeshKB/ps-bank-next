import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { AccountsEnrollment } from '.'

describe('TS:1 - AccountsEnrollment component', () => {
  it('TC:01 - should render AccountsEnrollment Component successfully with saving tab panel', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(
      <AccountsEnrollment />,
      {},
      {
        bankConextValue: { loginData: { customerName: 'Test User' } },
      }
    )
    expect(
      getByText('Thank you for chhosing us as your banking parnter.')
    ).toBeInTheDocument()
    expect(
      getByRole('tablist', { name: 'Open new account' })
    ).toBeInTheDocument()
    expect(getAllByRole('tab')).toHaveLength(2)
    expect(
      getByRole('heading', { name: 'Saving Accounts' })
    ).toBeInTheDocument()
    expect(getByRole('link', { name: 'Open Now' })).toBeInTheDocument()
  })

  it('TC:02 - should render AccountsEnrollment Component successfully with credit card tab panel', async () => {
    const { getByRole, getByText } = renderWithRouter(
      <AccountsEnrollment />,
      {},
      {
        bankConextValue: { loginData: { customerName: 'Test User' } },
      }
    )
    expect(
      getByRole('tablist', { name: 'Open new account' })
    ).toBeInTheDocument()
    const creditCardTab = getByRole('tab', { name: 'Credit card' })
    expect(creditCardTab).toBeInTheDocument()
    fireEvent.click(creditCardTab)

    await waitFor(() => {
      expect(getByRole('heading', { name: 'Credit Cards' })).toBeInTheDocument()
      expect(
        getByText(
          /Apply for a new credit card and earn benefits and reward points./
        )
      ).toBeInTheDocument()
      expect(getByRole('link', { name: 'Apply Now' })).toBeInTheDocument()
    })
  })
})
