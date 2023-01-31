import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { CreditCardApplication } from '.'
import {
  GET_CUSTOMER_DETAILS,
  APPLY_FOR_NEW_CREDIT_CARD,
} from '../../../graphql/queries'

const mockFormSubmit = jest.fn()

const bankConextValueMockData = {
  loginData: {
    customerId: 'PS_12345',
    customerName: 'Test name',
    AccessToken: 'testToken',
    isNewUser: false,
  },
}
const customerDetailSuccessMockData = {
  request: {
    query: GET_CUSTOMER_DETAILS,
    variables: {
      customerId: 'PS_12345',
    },
  },
  result: {
    data: {
      getCustomerDetails: {
        customerId: 'PS_12345',
        customerEmail: 'test@test.com',
        customerMob: '7892341234',
        customerName: 'Test name',
        dateOfBirth: '1991-10-06',
        genderType: 'male',
        fathersName: 'Person 1',
        mothersName: 'Person 2',
        occupation: 'salaried',
        income: '5_to_10',
        panNumber: 'GEFDT5623K',
        aadharNumber: '6754320911759476',
        addressLine1: 'Area local',
        addressLine2: '',
        city: 'Delhi',
        pincode: '201305',
        state: 'Delhi',
        country: 'india',
      },
    },
  },
}
const newCardFailedMockData = {
  request: {
    query: APPLY_FOR_NEW_CREDIT_CARD,
    variables: {
      customerId: 'PS_12345',
    },
  },
  error: new Error('Invalid form data'),
}
const newCardSuccessMockData = {
  request: {
    query: APPLY_FOR_NEW_CREDIT_CARD,
    variables: {
      input: {
        customerId: 'PS_12345',
        creditCardType: 'gold',
      },
    },
  },
  result: {
    data: {
      message: 'SUCCESS',
    },
  },
}

const component = (cardMockResponse: any = newCardFailedMockData) =>
  renderWithRouter(
    <CreditCardApplication onApplicationCompletion={mockFormSubmit} />,
    {},
    {
      graphQlResponseMocks: [
        customerDetailSuccessMockData,
        { ...cardMockResponse },
      ],
      bankConextValue: bankConextValueMockData,
    }
  )

describe('TS:1 - CreditCardApplication component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('TC:01 - should render loading message while customer data is being fetched from server', () => {
    const { getByText, getByRole } = renderWithRouter(
      <CreditCardApplication onApplicationCompletion={mockFormSubmit} />
    )
    expect(
      getByText(/Preparing form with customer details/)
    ).toBeInTheDocument()
    expect(getByRole('progressbar')).toBeInTheDocument()
  })

  it('TC:02 - should render CreditCardApplication Component successfully when customer data resolved from server', async () => {
    const { queryAllByRole } = component()
    await waitFor(() => {
      expect(queryAllByRole('textbox')).toHaveLength(13)
      expect(queryAllByRole('button')).toHaveLength(4)
      expect(queryAllByRole('radiogroup')).toHaveLength(3)
      expect(queryAllByRole('radio')).toHaveLength(8)
    })
  })

  it('TC:03 - should not call submit function on if form is not valid when submitted', async () => {
    const { getByRole, getByText } = component()
    await waitFor(() => {
      const submitButton = getByRole('button', { name: 'Finish' })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(getByText(/credit card type is required/)).toBeInTheDocument()
      expect(mockFormSubmit).not.toHaveBeenCalled()
    })
  })

  it('TC:04 - should call submit function if form is valid when submitted and error response form API ', async () => {
    const { getByRole, getAllByRole } = component()
    await waitFor(() => {
      const cardTypeGoldOption = getAllByRole('radio')[0]
      fireEvent.click(cardTypeGoldOption)
      const submitButton = getByRole('button', { name: 'Finish' })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockFormSubmit).toHaveBeenCalledWith('ERROR')
    })
  })

  it('TC:05 - should call submit function on if form is valid when submitted and success response from API', async () => {
    const { getByRole, getAllByRole, queryByText } = component(
      newCardSuccessMockData
    )
    await waitFor(() => {
      const cardTypeGoldOption = getAllByRole('radio')[0]
      fireEvent.click(cardTypeGoldOption)
      const submitButton = getByRole('button', { name: 'Finish' })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(
        queryByText(/Credit card application in progress, please wait!/)
      ).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(mockFormSubmit).toHaveBeenCalledWith('SUCCESS')
    })
  })
})
