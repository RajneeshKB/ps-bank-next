import React from 'react'
import { waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { TransactionsList } from '.'
import { FETCH_TRANSACTIONS } from '../../../graphql/queries'

const filterDataMock = {
  customerId: 'PS_123',
  accountNumber: '1234567890',
}
describe('TS:1 - TransactionsList component', () => {
  it('TC:01 - should render TransactionsList component successfully if api response is success', async () => {
    const { queryByRole, queryByText, queryAllByRole } = renderWithRouter(
      <TransactionsList filterData={filterDataMock} />,
      {},
      {
        graphQlResponseMocks: [
          {
            request: {
              query: FETCH_TRANSACTIONS,
              variables: {
                input: {
                  customerId: 'PS_123',
                  accountNumber: '1234567890',
                  page: 0,
                  pageSize: 10,
                },
              },
            },
            result: {
              data: {
                getTransactions: {
                  totalRowCount: 2,
                  transactions: [
                    {
                      transactionDate: '2022-02-01T18:30:00.000Z',
                      transactionRemark: 'test transaction',
                      transactionAmount: '10000',
                      transactionType: 'debit',
                      closingBalance: '20000',
                    },
                    {
                      transactionDate: '2022-02-01T18:30:00.000Z',
                      transactionRemark: 'test transaction',
                      transactionAmount: '10000',
                      transactionType: 'credit',
                      closingBalance: '10000',
                    },
                  ],
                },
              },
            },
          },
        ],
      }
    )
    expect(queryByText('loading transactions')).toBeInTheDocument()

    await waitFor(() => {
      expect(queryByRole('button', { name: 'Refresh' }))
      expect(queryAllByRole('row')).toHaveLength(3)
    })
  })

  it('TC:02 - should render error message if api call is failed', async () => {
    const { queryByText } = renderWithRouter(
      <TransactionsList filterData={filterDataMock} />,
      {},
      {
        graphQlResponseMocks: [
          {
            request: {
              query: FETCH_TRANSACTIONS,
              variables: {
                input: {
                  customerId: 'PS_123',
                  accountNumber: '1234567890',
                  page: 0,
                  pageSize: 10,
                },
              },
            },
            error: new Error('data mismatch'),
          },
        ],
      }
    )

    await waitFor(() => {
      expect(
        queryByText(
          /Unable to fetch transactions right now. Please try again later!/
        )
      ).toBeInTheDocument()
    })
  })
})
