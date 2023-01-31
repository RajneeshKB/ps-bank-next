import React from 'react'
import { fireEvent, waitFor, within } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { TransferMoney } from '.'
import {
  ADD_PAYEE,
  GET_ALL_ACCOUNTS_AND_BENEFICIARIES,
  TRANSFER_MONEY,
} from '../../../graphql/queries'

const bankConextValueMockData = {
  loginData: {
    customerId: 'PS_12345',
    customerName: 'Test name',
    AccessToken: 'testToken',
    isNewUser: false,
  },
}
const accountsDetailSuccessMockData = {
  request: {
    query: GET_ALL_ACCOUNTS_AND_BENEFICIARIES,
    variables: {
      customerId: 'PS_12345',
    },
  },
  result: {
    data: {
      getAccounts: [
        { accountNumber: '123', availableBalance: '100' },
        { accountNumber: '456', availableBalance: '500' },
      ],
      getAllBeneficiaries: [
        { accountNumber: '987', beneficiaryName: 'test 1' },
      ],
    },
  },
}
const paymentFailedMockData = {
  request: {
    query: TRANSFER_MONEY,
    variables: {
      input: {
        customerId: 'PS_12345',
        fromAccount: '456',
        transferAmount: '',
        transferRemarks: '',
        transferType: 'within',
      },
    },
  },
  error: new Error('Invalid form data'),
}
const paymentSuccessMockData = {
  request: {
    query: TRANSFER_MONEY,
    variables: {
      input: {
        customerId: 'PS_12345',
        fromAccount: '456',
        toAccount: '123',
        transferAmount: '100',
        transferRemarks: '',
        transferType: 'within',
      },
    },
  },
  result: {
    data: {
      transferMoney: 'SUCCESS',
    },
  },
}
const payeeFailedMockData = {
  request: {
    query: ADD_PAYEE,
    variables: {
      accountNumber: '123',
      beneficiaryName: 'stte',
      customerId: 'PS_12345',
    },
  },
  error: new Error('Invalid form data'),
}
const payeeSuccessMockData = {
  request: {
    query: ADD_PAYEE,
    variables: {
      input: {
        accountNumber: '7890',
        bankName: 'test',
        beneficiaryName: 'stte',
        customerId: 'PS_12345',
      },
    },
  },
  result: {
    data: {
      message: 'SUCCESS',
    },
  },
}

const component = (
  paymentMockResponse: any = paymentFailedMockData,
  payeeResponseMock: any = payeeFailedMockData
) =>
  renderWithRouter(
    <TransferMoney />,
    {},
    {
      graphQlResponseMocks: [
        accountsDetailSuccessMockData,
        { ...paymentMockResponse },
        { ...payeeResponseMock },
      ],
      bankConextValue: bankConextValueMockData,
    }
  )

describe('TS:1 - TransferMoney component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('TC:01 - should render loading message while account and beneficiery data is being fetched from server', () => {
    const { getByText, getByRole } = renderWithRouter(<TransferMoney />)
    expect(getByText(/Loading.../)).toBeInTheDocument()
    expect(getByRole('progressbar')).toBeInTheDocument()
  })

  it('TC:02 - should render TransferMoney form when account and beneficiery data resolved from server', async () => {
    const { queryByLabelText, queryAllByRole } = component()
    await waitFor(() => {
      expect(queryByLabelText(/Transfer Type/)).toBeInTheDocument()
      expect(queryAllByRole('radiogroup')).toHaveLength(1)
      expect(queryAllByRole('radio')).toHaveLength(2)
      expect(queryByLabelText(/Transfer From/)).toBeInTheDocument()
      expect(queryByLabelText(/Transfer To/)).toBeInTheDocument()
      expect(queryByLabelText(/Amount/)).toBeInTheDocument()
      expect(queryByLabelText(/Remarks/)).toBeInTheDocument()
    })
  })

  it('TC:03 - should initiate amount transfer and show error toast message if api fails ', async () => {
    const {
      queryByLabelText,
      queryAllByRole,
      queryByRole,
      getByRole,
      queryByText,
    } = component()
    await waitFor(() => {
      const transferTypeWithin = queryAllByRole('radio')[0]
      const transferFromSelect = queryByLabelText(/Transfer From/)
      const transferToSelect = queryByLabelText(/Transfer To/)
      const transferAmountBox = queryByLabelText(/Amount/)
      const transferRemarksBox = queryByLabelText(/Remarks/)
      const proceedBtn = queryByRole('button', { name: 'Proceed' })

      fireEvent.click(transferTypeWithin)
      if (transferFromSelect) fireEvent.mouseDown(transferFromSelect)
      const fromAccountOptions = within(getByRole('listbox'))
      fireEvent.click(fromAccountOptions.getByText(/456/i))
      if (transferToSelect) fireEvent.mouseDown(transferToSelect)
      const toAccountOptions = within(getByRole('listbox'))
      fireEvent.click(toAccountOptions.getByText(/123/i))
      if (transferAmountBox)
        fireEvent.change(transferAmountBox, { target: { value: '100' } })
      if (transferRemarksBox)
        fireEvent.change(transferRemarksBox, {
          target: { value: 'test transfer' },
        })
      if (proceedBtn) fireEvent.click(proceedBtn)

      waitFor(() => {
        expect(
          queryByText(/Oops, Operation failed. Try again!/)
        ).toBeInTheDocument()
      })
    })
  })

  it('TC:04 - should initiate amount transfer and show success toast message if api succeded ', async () => {
    const {
      queryByLabelText,
      queryAllByRole,
      queryByRole,
      getByRole,
      queryByText,
    } = component(paymentSuccessMockData)
    await waitFor(() => {
      const transferTypeWithin = queryAllByRole('radio')[0]
      const transferFromSelect = queryByLabelText(/Transfer From/)
      const transferToSelect = queryByLabelText(/Transfer To/)
      const transferAmountBox = queryByLabelText(/Amount/)
      const transferRemarksBox = queryByLabelText(/Remarks/)
      const proceedBtn = queryByRole('button', { name: 'Proceed' })

      fireEvent.click(transferTypeWithin)
      if (transferFromSelect) fireEvent.mouseDown(transferFromSelect)
      const fromAccountOptions = within(getByRole('listbox'))
      fireEvent.click(fromAccountOptions.getByText(/456/i))
      if (transferToSelect) fireEvent.mouseDown(transferToSelect)
      const toAccountOptions = within(getByRole('listbox'))
      fireEvent.click(toAccountOptions.getByText(/123/i))
      if (transferAmountBox)
        fireEvent.change(transferAmountBox, { target: { value: '100' } })
      if (transferRemarksBox)
        fireEvent.change(transferRemarksBox, {
          target: { value: 'test transfer' },
        })
      if (proceedBtn) fireEvent.click(proceedBtn)

      waitFor(() => {
        expect(queryByText(/Operation successfull/)).toBeInTheDocument()
        const closeToastBtn = queryByRole('button', { name: 'Close' })
        if (closeToastBtn) fireEvent.click(closeToastBtn)
      })
      waitFor(() => {
        expect(queryByText(/Operation successfull/)).not.toBeInTheDocument()
      })
    })
  })

  xit('TC:05 - should open add payee modal if transfer type is outside selected and add button clicked', async () => {
    const {
      queryByTestId,
      queryAllByRole,
      queryByLabelText,
      queryAllByLabelText,
      queryByRole,
    } = component()
    await waitFor(() => {
      expect(queryByLabelText(/Transfer Type/)).toBeInTheDocument()
      const transferTypeWithin = queryAllByRole('radio')[1]
      expect(transferTypeWithin).toBeInTheDocument()
      if (transferTypeWithin) fireEvent.click(transferTypeWithin)

      waitFor(() => {
        const addPayeeBtn = queryByTestId('add-payee-btn')
        expect(addPayeeBtn).toBeInTheDocument()
        if (addPayeeBtn) fireEvent.click(addPayeeBtn)
      })

      waitFor(() => {
        expect(queryByLabelText(/Bank Name/)).toBeInTheDocument()
        expect(queryByLabelText(/Payee Name/)).toBeInTheDocument()
        expect(
          queryAllByLabelText(/Account Number/, { exact: true })
        ).toHaveLength(2)
        expect(queryByLabelText(/Re-enter Account Number/)).toBeInTheDocument()
        expect(queryByRole('button', { name: 'Cancel' })).toBeDefined()
        expect(queryByRole('button', { name: 'Add Payee' })).toBeDefined()
      })
    })
  })

  xit('TC:06 - should add payee and show error toast message if api fails', async () => {
    const {
      queryByTestId,
      queryAllByRole,
      queryByLabelText,
      queryAllByLabelText,
      queryByRole,
      queryByText,
    } = component()
    await waitFor(() => {
      expect(queryByLabelText(/Transfer Type/)).toBeInTheDocument()
      const transferTypeWithin = queryAllByRole('radio')[1]
      expect(transferTypeWithin).toBeInTheDocument()
      if (transferTypeWithin) fireEvent.click(transferTypeWithin)

      waitFor(() => {
        const addPayeeBtn = queryByTestId('add-payee-btn')
        expect(addPayeeBtn).toBeInTheDocument()
        if (addPayeeBtn) fireEvent.click(addPayeeBtn)
      })

      waitFor(() => {
        const bankNameBox = queryByLabelText(/Bank Name/)
        const payeeNameBox = queryByLabelText(/Payee Name/)
        const accNumberBox = queryAllByLabelText(/Account Number/)[0]
        const confirmAccNoBox = queryByLabelText(/Re-enter Account Number/)

        expect(bankNameBox).toBeInTheDocument()
        expect(payeeNameBox).toBeInTheDocument()
        expect(accNumberBox).toBeInTheDocument()
        expect(confirmAccNoBox).toBeInTheDocument()

        if (bankNameBox)
          fireEvent.change(bankNameBox, { target: { value: 'test bank' } })
        if (payeeNameBox)
          fireEvent.change(payeeNameBox, { target: { value: 'new payee' } })
        if (accNumberBox)
          fireEvent.change(accNumberBox, { target: { value: '12345' } })
        if (confirmAccNoBox)
          fireEvent.change(confirmAccNoBox, { target: { value: '12345' } })

        const addBtn = queryByRole('button', { name: 'Add Payee' })
        if (addBtn) fireEvent.click(addBtn)
      })

      waitFor(() => {
        expect(
          queryByText(/Oops, Operation failed. Try again!/)
        ).toBeInTheDocument()
      })
    })
  })
})
