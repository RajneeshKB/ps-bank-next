import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { AccountsList } from '.'

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   Navigate: () => <div>Mock navigate component</div>,
// }))

const mockAcounts = [
  {
    accountNumber: '1234567890',
    accountType: 'Regular',
    availableBalance: '123456',
    activeDebitCard: '1234567890123456',
    cvvNumber: '123',
    validFrom: '02/2022',
    validTo: '02/2026',
    notifications: [],
  },
  {
    accountNumber: '1234567891',
    accountType: 'Premium',
    availableBalance: '123456',
    activeDebitCard: '1234567890123457',
    cvvNumber: '123',
    validFrom: '02/2022',
    validTo: '02/2026',
    notifications: [],
  },
]
const mockAccountsData = {
  getCustomerDetails: { customerName: 'Test User' },
  getAccounts: mockAcounts,
}

describe('TS:1 - AccountsList component', () => {
  it('TC:01 - should render AccountsList Component successfully', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(
      <AccountsList accountsData={mockAccountsData} />
    )
    expect(getByText('Accounts')).toBeInTheDocument()
    expect(getByRole('checkbox', { name: 'Show Details' })).toBeDefined()
    expect(getByText('REGULAR Account')).toBeInTheDocument()
    expect(getByText('PREMIUM Account')).toBeInTheDocument()
    expect(getAllByRole('button', { name: 'View Statement' })).toHaveLength(2)
  })

  it('TC:02 - should display hidden data on click of checkbox', async () => {
    const { getByRole, getAllByText } = renderWithRouter(
      <AccountsList accountsData={mockAccountsData} />
    )
    const showCheckbox = getByRole('checkbox', { name: 'Show Details' })
    expect(showCheckbox).toBeDefined()
    fireEvent.click(showCheckbox)

    await waitFor(() => {
      expect(getAllByText('₹123456')).toHaveLength(2)
    })
  })

  it('TC:03 - should navigate and render mocked navigate component if customer name not defined', () => {
    const { getByText } = renderWithRouter(
      <AccountsList
        accountsData={{
          ...mockAccountsData,
          getCustomerDetails: { customerName: '' },
        }}
      />
    )
    expect(getByText('Mock navigate component')).toBeInTheDocument()
  })
})
