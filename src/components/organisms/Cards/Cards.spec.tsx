import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { Cards } from '.'

const debitCardMockData = [
  {
    activeDebitCard: '1234567890123456',
    cvvNumber: '123',
    validFrom: '02/2022',
    validTo: '02/2026',
  },
]
const creditCardMockData = [
  {
    creditCardNumber: '1234567890123456',
    cvvNumber: '123',
    validFrom: '02/2022',
    validTo: '02/2026',
    availableLimit: '123456',
    creditCardType: 'gold',
    outstandingAmount: '0',
    cardholderId: 'test1',
  },
]
const mockCardsData = {
  getCustomerDetails: { customerName: 'Test user' },
  getAccounts: debitCardMockData,
  getCreditCards: creditCardMockData,
}

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   Navigate: () => <div>Mock navigate component</div>,
// }))
describe('TS:1 - Cards component', () => {
  it('TC:01 - should render Cards Component successfully', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Cards cardsList={mockCardsData} />
    )
    expect(getByText('Cards')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Credit Card' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Debit Card' })).toBeInTheDocument()
  })

  it('TC:02 - should render Cards Component successfully with hidden details on click of show detail checkbox', async () => {
    const { getByRole, getByText } = renderWithRouter(
      <Cards cardsList={mockCardsData} />
    )
    expect(getByText('Cards')).toBeInTheDocument()
    const checkboxDetail = getByRole('checkbox', { name: 'Show Card Details' })
    expect(checkboxDetail).toBeInTheDocument()
    fireEvent.click(checkboxDetail)
    await waitFor(() => {
      expect(getByRole('button', { name: 'Credit Card' })).toBeInTheDocument()
      expect(getByRole('button', { name: 'Debit Card' })).toBeInTheDocument()
    })
  })

  it('TC:03 - should redirect and render mocked navigated component if invalid data', () => {
    const { getByText } = renderWithRouter(
      <Cards
        cardsList={{ ...mockCardsData, getAccounts: [], getCreditCards: [] }}
      />
    )
    expect(getByText('Mock navigate component')).toBeInTheDocument()
  })
})
