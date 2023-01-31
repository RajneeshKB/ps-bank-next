import React from 'react'
import { render } from '@testing-library/react'
import { CardAccordian } from '.'

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
    cardNumber: '1234567890123456',
    cvvNumber: '123',
    validFrom: '02/2022',
    validTo: '02/2026',
    availableLimit: '123456',
    creditCardType: 'gold',
    outstandingAmount: '0',
  },
]

describe('TS:1 - CardAccordian Component', () => {
  it('TC:01 - should render credit card accordian', () => {
    const { getByText, getByRole } = render(
      <CardAccordian
        isCreditCard
        showDetails
        cardData={creditCardMockData}
        customerName="Test User"
      />
    )
    expect(getByText('PS Bank')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Credit Card' })).toBeInTheDocument()
    expect(getByText('VALID FROM')).toBeInTheDocument()
    expect(getByText('VALID THRU')).toBeInTheDocument()
    expect(getByText('Available limit')).toBeInTheDocument()
    expect(getByText('Current Outstanding')).toBeInTheDocument()
    expect(getByText('CVV')).toBeInTheDocument()
  })

  it('TC:02 - should render debit card accordian', () => {
    const { getByText, queryByText, getByRole } = render(
      <CardAccordian
        showDetails
        cardData={debitCardMockData}
        customerName="Test User"
      />
    )
    expect(getByText('PS Bank')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Debit Card' })).toBeInTheDocument()
    expect(getByText('VALID FROM')).toBeInTheDocument()
    expect(getByText('VALID THRU')).toBeInTheDocument()
    expect(queryByText('Available limit')).not.toBeInTheDocument()
    expect(queryByText('Current Outstanding')).not.toBeInTheDocument()
  })
})
