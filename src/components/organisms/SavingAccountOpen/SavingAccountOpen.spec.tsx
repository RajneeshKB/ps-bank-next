import React from 'react'
import { fireEvent, waitFor, within } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { SavingAccountOpenForm } from '.'
import {
  GET_CUSTOMER_DETAILS,
  OPEN_NEW_SAVING_ACCOUNT,
} from '../../../graphql/queries'

const mockProps = {
  mockBasicData: {
    customerName: 'Test name',
    customerMob: '7892341234',
    customerEmail: 'test@test.com',
  },
  mockFormSubmit: jest.fn(),
}
let activeStep = 0
const mockJointAccountFormData = {
  savingAccountType: 'premium',
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
  isJointAccount: true,
  joint_customerName: 'test',
  joint_dateOfBirth: '1990-10-10',
  joint_genderType: 'male',
  joint_fathersName: 'testt',
  joint_mothersName: 'tetsst',
  joint_customerEmail: 'test@tdst.com',
  joint_customerMob: '8988765456',
  joint_addressLine1: 'testasd',
  joint_addressLine2: '',
  joint_city: 'asd',
  joint_pincode: '234333',
  joint_state: 'sdcs',
  joint_country: 'india',
  joint_occupation: 'business',
  joint_income: '5_to_10',
  joint_panNumber: 'tggfr3456t',
  joint_aadharNumber: '6666776654345678',
  joint_relationship: 'son',
  nominee_relationship: '',
  nominee_customerName: '',
  nominee_dateOfBirth: '',
  nominee_genderType: '',
  nominee_fathersName: '',
  nominee_mothersName: '',
}
const mockJointNomineeFormData = {
  ...mockJointAccountFormData,
  nominee_relationship: 'spouse',
  nominee_customerName: 'new nominee',
  nominee_dateOfBirth: '2006-10-10',
  nominee_genderType: 'female',
  nominee_fathersName: 'father test',
  nominee_mothersName: 'mother test',
}
const mockPaymentFormData = {
  ...mockJointNomineeFormData,
  initialDeposit: '10000',
  paymentMethod: 'cheque',
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
const openAccountFailedMockData = {
  request: {
    query: OPEN_NEW_SAVING_ACCOUNT,
    variables: {
      customerId: 'PS_12345',
    },
  },
  error: new Error('Invalid form data'),
}
const openAccountSuccessMockData = {
  request: {
    query: OPEN_NEW_SAVING_ACCOUNT,
    variables: { input: mockPaymentFormData },
  },
  result: {
    data: {
      openNewAccount: '6839947325',
    },
  },
}
const bankConextValueMockData = {
  loginData: {
    customerId: 'PS_12345',
    customerName: 'Test name',
    AccessToken: 'testToken',
    isNewUser: false,
  },
}

const component = () =>
  renderWithRouter(
    <SavingAccountOpenForm
      activeStep={activeStep}
      stepNavigationHandler={mockProps.mockFormSubmit}
    />,
    {},
    {
      graphQlResponseMocks: [
        customerDetailSuccessMockData,
        openAccountFailedMockData,
      ],
      bankConextValue: bankConextValueMockData,
    }
  )
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}

  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: string) {
      store[key] = value.toString()
    },
    removeItem(key: string) {
      delete store[key]
    },
    clear() {
      store = {}
    },
  }
})()
Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
})
describe('TS:1 - SavingAccountOpenForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    sessionStorage.clear()
  })

  it('TC:01 - should render loading message while customer data is being fetched from server', () => {
    const { getByText, getByRole } = renderWithRouter(
      <SavingAccountOpenForm
        activeStep={activeStep}
        stepNavigationHandler={mockProps.mockFormSubmit}
      />
    )
    expect(
      getByText(/Preparing form with customer details/)
    ).toBeInTheDocument()
    expect(getByRole('progressbar')).toBeInTheDocument()
  })

  it('TC:02 - should render SavingAccountOpenForm Component successfully when customer data resolved from server', async () => {
    const { queryAllByRole } = component()
    await waitFor(() => {
      expect(queryAllByRole('textbox')).toHaveLength(13)
      expect(queryAllByRole('button')).toHaveLength(4)
      expect(queryAllByRole('radiogroup')).toHaveLength(3)
      expect(queryAllByRole('radio')).toHaveLength(8)
    })
  })

  it('TC:03 - should not call submit function on if form is not valid when submitted', async () => {
    jest.spyOn(mockProps, 'mockFormSubmit')
    const { getByRole } = component()
    await waitFor(() => {
      const submitButton = getByRole('button', { name: 'Continue' })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockProps.mockFormSubmit).not.toHaveBeenCalled()
    })
  })

  it('TC:04 - should call submit function on if form is valid when submitted', async () => {
    jest.spyOn(mockProps, 'mockFormSubmit')
    const { getByRole, getAllByRole } = component()
    await waitFor(() => {
      const accountTypeBox = getAllByRole('radio')[0]
      const jointAccountCheck = getByRole('checkbox')
      fireEvent.click(accountTypeBox)
      fireEvent.click(jointAccountCheck)
      const submitButton = getByRole('button', { name: 'Continue' })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockProps.mockFormSubmit).toHaveBeenCalledWith('NEXT')
    })
  })

  it('TC:05 - should render joinee detail form is active step is 1', () => {
    activeStep = 1
    const { getAllByRole } = component()
    expect(getAllByRole('textbox')).toHaveLength(13)
    expect(getAllByRole('button')).toHaveLength(6)
    expect(getAllByRole('radiogroup')).toHaveLength(2)
    expect(getAllByRole('radio')).toHaveLength(6)
  })

  it('TC:06 - should go back to primary account holder form if back button is clicked from joinee details step', async () => {
    jest.spyOn(mockProps, 'mockFormSubmit')
    const { getByRole, getAllByRole } = component()
    await waitFor(() => {
      expect(getAllByRole('button')).toHaveLength(6)
      const backButton = getByRole('button', { name: 'Back' })
      backButton.click()
    })

    await waitFor(() => {
      expect(mockProps.mockFormSubmit).toHaveBeenCalledWith('PREV')
    })
  })

  it('TC:07 - should reset session data of joint account detail if not a joint account', async () => {
    sessionStorage.setItem(
      'accountOpeningFormData',
      JSON.stringify(mockJointAccountFormData)
    )
    activeStep = 0
    jest.spyOn(mockProps, 'mockFormSubmit')
    const { getByRole } = component()
    await waitFor(() => {
      const jointAccountCheck = getByRole('checkbox')
      fireEvent.click(jointAccountCheck)
      const submitButton = getByRole('button', { name: 'Continue' })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockProps.mockFormSubmit).toHaveBeenCalledWith('SKIP_NEXT')
    })
  })

  it('TC:09 - should call api to open account and call mockFormSubmit with  SUCCESS type', async () => {
    sessionStorage.setItem(
      'accountOpeningFormData',
      JSON.stringify(mockJointNomineeFormData)
    )
    activeStep = 3
    jest.spyOn(mockProps, 'mockFormSubmit')
    const { getByRole, getByLabelText } = renderWithRouter(
      <SavingAccountOpenForm
        activeStep={activeStep}
        stepNavigationHandler={mockProps.mockFormSubmit}
      />,
      {},
      {
        graphQlResponseMocks: [
          customerDetailSuccessMockData,
          openAccountSuccessMockData,
        ],
        bankConextValue: bankConextValueMockData,
      }
    )
    await waitFor(() => {
      const initialAmountBox = getByLabelText('Inital Deposit Amount *')
      const paymentMethodBox = getByLabelText('Payment Method *')
      fireEvent.change(initialAmountBox, { target: { value: 10000 } })
      fireEvent.mouseDown(paymentMethodBox)
      const paymentOptions = within(getByRole('listbox'))
      fireEvent.click(paymentOptions.getByText(/Cheque/i))
    })

    await waitFor(() => {
      const submitButton = getByRole('button', { name: 'Finish' })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockProps.mockFormSubmit).toHaveBeenLastCalledWith('SUCCESS')
    })
  })

  it('TC:10 - should call api to open account and call mockFormSubmit with ERROR type', async () => {
    sessionStorage.setItem(
      'accountOpeningFormData',
      JSON.stringify(mockJointNomineeFormData)
    )
    activeStep = 3
    jest.spyOn(mockProps, 'mockFormSubmit')
    const { getByRole, getByLabelText } = component()
    await waitFor(() => {
      const initialAmountBox = getByLabelText('Inital Deposit Amount *')
      const paymentMethodBox = getByLabelText('Payment Method *')
      fireEvent.change(initialAmountBox, { target: { value: 10000 } })
      fireEvent.mouseDown(paymentMethodBox)
      const paymentOptions = within(getByRole('listbox'))
      fireEvent.click(paymentOptions.getByText(/Cheque/i))
    })

    await waitFor(() => {
      const submitButton = getByRole('button', { name: 'Finish' })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockProps.mockFormSubmit).toHaveBeenLastCalledWith('ERROR')
    })
  })
})
