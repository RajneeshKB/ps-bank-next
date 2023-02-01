import React from 'react'
import { fireEvent, waitFor, within } from '@testing-library/react'
import { GET_ACCOUNTS } from '@/graphql/queries'
import { renderWithRouter } from '@/utils/test-utils'
import AccountStatement from '@/pages/ps-bank/account-dashboard/account-statement'

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

describe('TS:1 - AccountStatement component', () => {
  it('TC:01 - should render AccountStatement Component successfully filter form', async () => {
    const { getByText, getByLabelText, getAllByRole } = renderWithRouter(
      <AccountStatement />,
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
      expect(getByText(/Account Statement/)).toBeInTheDocument()
      expect(getByLabelText(/Select Account/)).toBeInTheDocument()
      expect(getByLabelText(/Transaction range/)).toBeInTheDocument()
      expect(getAllByRole('radiogroup')).toHaveLength(1)
      expect(getAllByRole('radio')).toHaveLength(2)
    })
  })

  it('TC:02 - should fetch transactions and show loading message if filter form is filled with last 10 transaction option', async () => {
    const { getByText, getByLabelText, getAllByRole, getByRole } =
      renderWithRouter(
        <AccountStatement />,
        {},
        {
          graphQlResponseMocks: [accountsSuccessMockData],
          bankConextValue: bankConextValueMockData,
        }
      )

    await waitFor(() => {
      expect(getByText(/Account Statement/)).toBeInTheDocument()
      expect(getByLabelText(/Select Account/)).toBeInTheDocument()

      const accountSelectBox = getByLabelText(/Select Account/)
      const lastTenOption = getAllByRole('radio')[0]
      const submitButton = getByRole('button', { name: 'View transactions' })
      fireEvent.mouseDown(accountSelectBox)
      const accountOptions = within(getByRole('listbox'))
      fireEvent.click(accountOptions.getByText(/1234567890/i))
      fireEvent.click(lastTenOption)
      fireEvent.click(submitButton)

      waitFor(() => {
        expect(getByText('loading transactions')).toBeInTheDocument()
      })
    })
  })

  it('TC:03 - should not fetch transactions and not show loading message if filter form is invalid', async () => {
    const { getByText, getByLabelText, getAllByRole, getByRole, queryByText } =
      renderWithRouter(
        <AccountStatement />,
        {},
        {
          graphQlResponseMocks: [accountsSuccessMockData],
          bankConextValue: bankConextValueMockData,
        }
      )

    await waitFor(() => {
      expect(getByText(/Account Statement/)).toBeInTheDocument()
      expect(getByLabelText(/Select Account/)).toBeInTheDocument()

      const accountSelectBox = getByLabelText(/Select Account/)
      const dateRangeOption = getAllByRole('radio')[1]
      const submitButton = getByRole('button', { name: 'View transactions' })
      fireEvent.mouseDown(accountSelectBox)
      const accountOptions = within(getByRole('listbox'))
      fireEvent.click(accountOptions.getByText(/1234567890/i))
      fireEvent.click(dateRangeOption)
      fireEvent.click(submitButton)

      waitFor(() => {
        expect(queryByText('loading transactions')).not.toBeInTheDocument()
      })
    })
  })

  xit('TC:04 - should fetch transactions and show loading message if filter form is filled with date range option', async () => {
    const { getByText, getByLabelText, getAllByRole, getByRole } =
      renderWithRouter(
        <AccountStatement />,
        {},
        {
          graphQlResponseMocks: [accountsSuccessMockData],
          bankConextValue: bankConextValueMockData,
        }
      )

    await waitFor(() => {
      expect(getByText(/Account Statement/)).toBeInTheDocument()
      expect(getByLabelText(/Select Account/)).toBeInTheDocument()

      const accountSelectBox = getByLabelText(/Select Account/)
      const dateRangeOption = getAllByRole('radio')[1]
      const submitButton = getByRole('button', { name: 'View transactions' })
      fireEvent.mouseDown(accountSelectBox)
      const accountOptions = within(getByRole('listbox'))
      fireEvent.click(accountOptions.getByText(/1234567890/i))
      fireEvent.click(dateRangeOption)
      const fromDate = getByLabelText(/Date from/)
      const toDate = getByLabelText(/Date to/)
      fireEvent.change(fromDate, {
        target: { value: '10/22/1990' },
      })
      fireEvent.change(toDate, {
        target: { value: '10/22/1990' },
      })
      fireEvent.click(submitButton)

      waitFor(() => {
        expect(getByText('loading transactions')).toBeInTheDocument()
      })
    })
  })

  xit('TC:05 - should render error message when api fails in getting accounts from server', async () => {
    const { getByText } = renderWithRouter(
      <AccountStatement />,
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
