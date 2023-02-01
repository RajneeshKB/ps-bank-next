import React from 'react'
import { GET_ACCOUNTS } from '@/graphql/queries'
import AccountsDashboard from '@/pages/ps-bank/account-dashboard'
import { renderWithRouter } from '@/utils/test-utils'
import { waitFor } from '@testing-library/react'

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

const bankConextValueMockData = {
  loginData: {
    customerId: 'PS_12345',
    customerName: 'Test name',
    AccessToken: 'testToken',
    isNewUser: false,
  },
}

const accountsFailedMockData = {
  request: {
    query: GET_ACCOUNTS,
    variables: {
      customerId: 'PS_12345',
    },
  },
  error: new Error('Invalid form data'),
}
const accountsSuccessMockData = {
  request: {
    query: GET_ACCOUNTS,
    variables: {
      customerId: 'PS_12345',
    },
  },
  result: {
    data: {
      getAccounts: mockAcounts,
      getCustomerDetails: { customerName: 'Test name' },
    },
  },
}

describe('TS:1 - AccountsDashboard component', () => {
  it('TC:01 - should render AccountsDashboard Component successfully with accounts list when api succeded', async () => {
    const { getByText, getAllByRole, getByRole } = renderWithRouter(
      <AccountsDashboard />,
      {},
      {
        graphQlResponseMocks: [accountsSuccessMockData],
        bankConextValue: bankConextValueMockData,
      }
    )

    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(getByRole('checkbox', { name: 'Show Details' })).toBeDefined()
      expect(getByText('REGULAR Account')).toBeInTheDocument()
      expect(getByText('PREMIUM Account')).toBeInTheDocument()
      expect(getAllByRole('button', { name: 'View Statement' })).toHaveLength(2)
    })
  })

  it('TC:02 - should render AccountsDashboard Component with error message when api fails', async () => {
    const { getByText } = renderWithRouter(
      <AccountsDashboard />,
      {},
      {
        graphQlResponseMocks: [accountsFailedMockData],
        bankConextValue: bankConextValueMockData,
      }
    )

    await waitFor(() => {
      expect(
        getByText('Error occured while fetching accounts. Try again!')
      ).toBeInTheDocument()
    })
  })
})
