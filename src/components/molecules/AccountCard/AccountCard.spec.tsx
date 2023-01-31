import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { AccountCard } from '.'
import { renderWithRouter } from '../../../utils/test-utils'

const mockData = { mockNavigate: jest.fn() }
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockData.mockNavigate,
// }))

describe('TS:1 - AccountCard Component', () => {
  it('TC:01 - should render account card with linked debit card', () => {
    const { getByText, getByRole } = renderWithRouter(
      <AccountCard
        customerName="Test User"
        accountNumber="1234567890"
        accountType="Regular"
        availableBalance="123456"
        activeDebitCard="1234567890123456"
        cvvNumber="123"
        validFrom="02/2022"
        validTo="02/2026"
        showBalance={false}
        notifications={[]}
      />
    )
    expect(getByText('REGULAR Account')).toBeInTheDocument()
    expect(getByText('1234567890')).toBeInTheDocument()
    expect(getByText('₹******')).toBeInTheDocument()
    expect(getByText('************3456')).toBeInTheDocument()
    expect(getByText('PS Bank')).toBeInTheDocument()
    expect(getByText('VALID FROM')).toBeInTheDocument()
    expect(getByText('VALID THRU')).toBeInTheDocument()
    expect(getByText('CVV')).toBeInTheDocument()
    expect(getByRole('button', { name: 'View Statement' })).toBeInTheDocument()
  })

  it('TC:02 - should render alert notification message', async () => {
    const { getByText, getByRole } = renderWithRouter(
      <AccountCard
        customerName="Test User"
        accountNumber="1234567890"
        accountType="Regular"
        availableBalance="123456"
        activeDebitCard="1234567890123456"
        cvvNumber="123"
        validFrom="02/2022"
        validTo="02/2026"
        showBalance
        notifications={[{ code: '101', message: 'test notification' }]}
      />
    )
    expect(getByText('REGULAR Account')).toBeInTheDocument()
    expect(getByText('1234567890')).toBeInTheDocument()
    expect(getByRole('button', { name: 'View Statement' })).toBeInTheDocument()
    expect(getByText('test notification')).toBeInTheDocument()
  })

  it('TC:03 - should render mocked navigated component on click of view statement button', async () => {
    const { getByRole } = renderWithRouter(
      <AccountCard
        customerName="Test User"
        accountNumber="1234567890"
        accountType="Regular"
        availableBalance="123456"
        activeDebitCard="1234567890123456"
        cvvNumber="123"
        validFrom="02/2022"
        validTo="02/2026"
        showBalance
        notifications={[]}
      />
    )
    const viewStatementButton = getByRole('button', { name: 'View Statement' })
    expect(viewStatementButton).toBeInTheDocument()
    fireEvent.click(viewStatementButton)
    await waitFor(() => {
      expect(mockData.mockNavigate).toHaveBeenCalled()
    })
  })
})
