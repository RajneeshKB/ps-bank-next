import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { Box, Button, Stack, Typography } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'
import { DataGrid } from '@mui/x-data-grid'
import {
  ACCOUNT_TRANSACTION_COLUMNS,
  TRANSACTION_PAGE_SIZE,
} from '../../../utils'
import { ViewLoader } from '../../atoms/ViewLoader'
import { FETCH_TRANSACTIONS } from '../../../graphql/queries'

interface ITransactionsList {
  filterData: {
    customerId: string
    accountNumber: string
    lastTenTransactions?: boolean
    fromDate?: string
    toDate?: string
  }
}

const Transactions: FC<ITransactionsList> = ({ filterData }) => {
  const [page, setPage] = useState(0)

  const queryOptions = React.useMemo(
    () => ({
      variables: {
        input: { ...filterData, page, pageSize: TRANSACTION_PAGE_SIZE },
      },
    }),
    [page, filterData]
  )
  const {
    loading,
    error,
    data: transactionData,
    refetch,
  } = useQuery(FETCH_TRANSACTIONS, {
    ...queryOptions,
    fetchPolicy: 'no-cache',
  })
  const [rowCountState, setRowCountState] = useState(
    transactionData?.getTransactions?.totalRowCount || 0
  )

  React.useEffect(() => {
    setRowCountState((prevRowCountState: number) =>
      transactionData?.getTransactions?.totalRowCount !== undefined
        ? transactionData?.getTransactions?.totalRowCount
        : prevRowCountState
    )
  }, [transactionData?.getTransactions?.totalRowCount, setRowCountState])

  if (loading) {
    return <ViewLoader label="loading transactions" />
  }

  if (error) {
    return (
      <Typography variant="subtitle1">
        Unable to fetch transactions right now. Please try again later!
      </Typography>
    )
  }

  const formattedTransactionList =
    transactionData?.getTransactions?.transactions?.map(
      (transaction: any, index: number) => {
        const {
          transactionDate,
          transactionRemark,
          transactionAmount,
          transactionType,
          closingBalance,
        } = transaction

        const trDate = dayjs(+transactionDate).format('MM/DD/YYYY')
        return {
          id: index + 1,
          trDate,
          trRemark: transactionRemark,
          drAmount: transactionType === 'debit' ? transactionAmount : '',
          crAmount: transactionType === 'credit' ? transactionAmount : '',
          balance: closingBalance,
        }
      }
    ) || []

  return (
    <Stack spacing={3} p="1rem">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Transactions List</Typography>
        <Button
          variant="outlined"
          startIcon={<CachedIcon />}
          onClick={() => {
            refetch()
          }}
        >
          Refresh
        </Button>
      </Stack>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            rows={formattedTransactionList}
            rowCount={rowCountState}
            loading={loading}
            columns={ACCOUNT_TRANSACTION_COLUMNS}
            pagination
            page={page}
            pageSize={TRANSACTION_PAGE_SIZE}
            paginationMode="server"
            rowsPerPageOptions={[TRANSACTION_PAGE_SIZE]}
            onPageChange={(newPage) => setPage(newPage)}
            autoHeight
          />
        </Box>
      </Box>
    </Stack>
  )
}

export default Transactions
