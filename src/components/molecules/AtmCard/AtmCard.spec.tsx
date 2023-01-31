import React from 'react'
import { render } from '@testing-library/react'
import { AtmCard } from '.'

describe('TS:1 - AtmCard Component', () => {
  it('TC:01 - should render credit card', () => {
    const { getByText } = render(
      <AtmCard
        customerName="Test user"
        cardNumber="1234567890123456"
        cvvNumber="123"
        validFrom="02/2022"
        validTo="02/2026"
        showDetails={false}
        isCreditCard
        availableLimit="123456"
        creditCardType="gold"
        outstandingAmount="0"
      />
    )
    expect(getByText('PS Bank')).toBeInTheDocument()
    expect(getByText('VALID FROM')).toBeInTheDocument()
    expect(getByText('VALID THRU')).toBeInTheDocument()
    expect(getByText('Available limit')).toBeInTheDocument()
    expect(getByText('Current Outstanding')).toBeInTheDocument()
    expect(getByText('CVV')).toBeInTheDocument()
  })

  it('TC:02 - should render credit card of type platinum', () => {
    const { getByText } = render(
      <AtmCard
        customerName="Test user"
        cardNumber="1234567890123456"
        cvvNumber="123"
        validFrom="02/2022"
        validTo="02/2026"
        showDetails={false}
        isCreditCard
        availableLimit="123456"
        creditCardType="platinum"
        outstandingAmount="0"
      />
    )
    expect(getByText('PS Bank')).toBeInTheDocument()
    expect(getByText('VALID FROM')).toBeInTheDocument()
    expect(getByText('VALID THRU')).toBeInTheDocument()
    expect(getByText('Available limit')).toBeInTheDocument()
    expect(getByText('Current Outstanding')).toBeInTheDocument()
    expect(getByText('CVV')).toBeInTheDocument()
  })

  it('TC:03 - should render debit card', () => {
    const { getByText, queryByText } = render(
      <AtmCard
        customerName="Test user"
        cardNumber="1234567890123456"
        cvvNumber="123"
        validFrom="02/2022"
        validTo="02/2026"
        showDetails
        isCreditCard={false}
      />
    )
    expect(getByText('PS Bank')).toBeInTheDocument()
    expect(getByText('VALID FROM')).toBeInTheDocument()
    expect(getByText('VALID THRU')).toBeInTheDocument()
    expect(queryByText('Available limit')).not.toBeInTheDocument()
    expect(queryByText('Current Outstanding')).not.toBeInTheDocument()
  })

  it('TC:04 - should render credit card with notification', () => {
    const { getByText } = render(
      <AtmCard
        customerName="Test user"
        cardNumber="1234567890123456"
        cvvNumber="123"
        validFrom="02/2022"
        validTo="02/2026"
        showDetails={false}
        isCreditCard
        availableLimit="123456"
        creditCardType="gold"
        outstandingAmount="0"
        notifications={[{ code: '101', message: 'test notification' }]}
      />
    )
    expect(getByText('VALID FROM')).toBeInTheDocument()
    expect(getByText('VALID THRU')).toBeInTheDocument()
    expect(getByText('Available limit')).toBeInTheDocument()
    expect(getByText('Current Outstanding')).toBeInTheDocument()
    expect(getByText('test notification')).toBeInTheDocument()
  })
})
