import React from 'react'
import { waitFor } from '@testing-library/react'
import { GET_CREDIT_CARDS } from '@/graphql/queries'
import { renderWithRouter } from '@/utils/test-utils'
import CardsDashboard from '@/pages/ps-bank/card-dashboard'

const debitCardMockData = [
  {
    activeDebitCard: '1234567890123456',
    cvvNumber: '123',
    validFrom: '02/2022',
    validTo: '02/2026',
  },
]

const bankConextValueMockData = {
  loginData: {
    customerId: 'PS_12345',
    customerName: 'Test name',
    AccessToken: 'testToken',
    isNewUser: false,
  },
}

const cardsFailedMockData = {
  request: {
    query: GET_CREDIT_CARDS,
    variables: {
      customerId: 'PS_12345',
    },
  },
  error: new Error('Invalid form data'),
}
const cardsSuccessMockData = {
  request: {
    query: GET_CREDIT_CARDS,
    variables: {
      customerId: 'PS_12345',
    },
  },
  result: {
    data: {
      getAccounts: debitCardMockData,
      getCreditCards: [],
      getCustomerDetails: { customerName: 'Test name' },
    },
  },
}

describe('TS:1 - CardsDashboard component', () => {
  it('TC:01 - should render CardsDashboard Component successfully with cards list when api succeded', async () => {
    const { getByText, getByRole } = renderWithRouter(
      <CardsDashboard />,
      {},
      {
        graphQlResponseMocks: [cardsSuccessMockData],
        bankConextValue: bankConextValueMockData,
      }
    )

    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(getByRole('button', { name: 'Credit Card' })).toBeInTheDocument()
      expect(getByRole('button', { name: 'Debit Card' })).toBeInTheDocument()
    })
  })

  it('TC:02 - should render CardsDashboard Component with error message when api fails', async () => {
    const { getByText } = renderWithRouter(
      <CardsDashboard />,
      {},
      {
        graphQlResponseMocks: [cardsFailedMockData],
        bankConextValue: bankConextValueMockData,
      }
    )

    await waitFor(() => {
      expect(
        getByText('Error occured while fetching card. Try again!')
      ).toBeInTheDocument()
    })
  })
})
