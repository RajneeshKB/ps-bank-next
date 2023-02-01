import React from 'react'
import { fireEvent, waitFor, within } from '@testing-library/react'
import { renderWithRouter } from '@/utils/test-utils'
import CustomerRegistration from '@/pages/registration'
import { REGISTER_CUSTOMER } from '@/graphql/queries'

const mockData = { mockNavigate: jest.fn() }

xdescribe('TS:1 - CustomerRegistration component', () => {
  xit('TC:01 - should render mock navigate component if customer basic details is not available in context', () => {
    const { getByText, queryByText } = renderWithRouter(
      <CustomerRegistration />
    )
    expect(
      queryByText(
        /Just one more step to get started with your digital banking account/
      )
    ).not.toBeInTheDocument()
    expect(getByText('Mock navigate component')).toBeInTheDocument()
  })

  it('TC:02 - should render CustomerRegistration component successfully if valid data available in context', () => {
    const { getByText, getAllByRole } = renderWithRouter(
      <CustomerRegistration />,
      {},
      {
        bankConextValue: {
          registrationData: {
            customerName: 'Test name',
            customerEmail: 'test@test.com',
            customerMob: '7894567345',
          },
          loginData: {},
        },
      }
    )
    expect(
      getByText(
        /Just one more step to get started with your digital banking account/
      )
    ).toBeInTheDocument()
    expect(getAllByRole('textbox')).toHaveLength(13)
    expect(getAllByRole('button')).toHaveLength(4)
    expect(getAllByRole('radiogroup')).toHaveLength(2)
    expect(getAllByRole('radio')).toHaveLength(6)
  })

  it('TC:03 - should render success modal on registration success and call mocked useNavigate on modal close', async () => {
    const {
      getByLabelText,
      getByRole,
      getAllByRole,
      queryByText,
      queryByRole,
    } = renderWithRouter(
      <CustomerRegistration />,
      {},
      {
        bankConextValue: {
          registrationData: {
            customerName: 'Test name',
            customerEmail: 'test@test.com',
            customerMob: '7894567345',
          },
          loginData: {},
        },
        graphQlResponseMocks: [
          {
            request: {
              query: REGISTER_CUSTOMER,
              variables: {
                input: {
                  customerEmail: 'test@test.com',
                  customerMob: '7894567345',
                  customerName: 'Test name',
                  occupation: 'salaried',
                  genderType: 'female',
                  dateOfBirth: new Date('10/22/1990').toISOString(),
                  fathersName: 'Father Name',
                  mothersName: 'Mother Name',
                  income: '10_to_20',
                  panNumber: 'BRSGF1472D',
                  aadharNumber: '6537238569157654',
                  addressLine1: 'test apartment flat 2',
                  addressLine2: '',
                  city: 'Delhi',
                  pincode: '123456',
                  state: 'Delhi',
                  country: 'india',
                },
              },
            },
            result: { data: { createCustomer: { customerName: 'Test name' } } },
          },
        ],
      }
    )

    const occupationBox = getByLabelText('Occupation *')
    const incomeBox = getAllByRole('radio')[4]
    const genderBox = getAllByRole('radio')[1]
    const panBox = getByLabelText('PAN number *')
    const dobBox = getByLabelText('Date of birth *')
    const fatherNameBox = getByLabelText("Father's Name *")
    const motherNameBox = getByLabelText("Mother's maiden Name *")
    const aadharBox = getByLabelText('Aadhar number *')
    const addressBox = getByLabelText('Address line 1 *')
    const pincodeBox = getByLabelText('Pincode *')
    const stateBox = getByLabelText('State *')
    const cityBox = getByLabelText('City *')

    // Select option from occupation dropdown
    fireEvent.mouseDown(occupationBox)
    const occupationOptions = within(getByRole('listbox'))
    fireEvent.click(occupationOptions.getByText(/salaried/i))
    // Select income radio option
    fireEvent.click(incomeBox)
    fireEvent.click(genderBox)
    fireEvent.change(dobBox, {
      target: { value: '10/22/1990' },
    })
    fireEvent.change(fatherNameBox, { target: { value: 'Father Name' } })
    fireEvent.change(motherNameBox, { target: { value: 'Mother Name' } })
    fireEvent.change(panBox, { target: { value: 'BRSGF1472D' } })
    fireEvent.change(pincodeBox, { target: { value: '123456' } })
    fireEvent.change(aadharBox, { target: { value: '6537238569157654' } })
    fireEvent.change(addressBox, { target: { value: 'test apartment flat 2' } })
    fireEvent.change(stateBox, { target: { value: 'Delhi' } })
    fireEvent.change(cityBox, { target: { value: 'Delhi' } })

    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(queryByText(/You're all set/)).toBeInTheDocument()
      expect(queryByText(/Happy banking!/)).toBeInTheDocument()
      expect(queryByRole('button', { name: 'Close' })).toBeDefined()
    })

    const modalCloseButton = getByRole('button', { name: 'Close' })
    fireEvent.click(modalCloseButton)

    await waitFor(() => {
      expect(queryByText(/You're all set/)).not.toBeInTheDocument()
      expect(mockData.mockNavigate).toHaveBeenCalled()
    })
  })

  it('TC:04 - should render failure modal on registration failure and call mocked useNavigate on modal close', async () => {
    const {
      getByLabelText,
      getByRole,
      getAllByRole,
      queryByText,
      queryByRole,
    } = renderWithRouter(
      <CustomerRegistration />,
      {},
      {
        bankConextValue: {
          registrationData: {
            customerName: 'Test name',
            customerEmail: 'test@test.com',
            customerMob: '7894567345',
          },
          loginData: {},
        },
        graphQlResponseMocks: [
          {
            request: {
              query: REGISTER_CUSTOMER,
              variables: {
                input: {
                  customerEmail: 'test@test.com',
                  customerMob: '7894567345',
                  customerName: 'Test name',
                  occupation: 'salaried',
                  genderType: 'female',
                  dateOfBirth: new Date('10/22/1990').toISOString(),
                  fathersName: 'Father Name',
                  mothersName: 'Mother Name',
                  income: '10_to_20',
                  panNumber: 'BRSGF1472D',
                  aadharNumber: '6537238569157654',
                  addressLine1: 'test apartment flat 2',
                  addressLine2: '',
                  city: 'Delhi',
                  pincode: '123456',
                  state: 'Delhi',
                  country: 'india',
                },
              },
            },
            error: new Error('an error occured'),
          },
        ],
      }
    )

    const occupationBox = getByLabelText('Occupation *')
    const incomeBox = getAllByRole('radio')[4]
    const genderBox = getAllByRole('radio')[1]
    const panBox = getByLabelText('PAN number *')
    const dobBox = getByLabelText('Date of birth *')
    const fatherNameBox = getByLabelText("Father's Name *")
    const motherNameBox = getByLabelText("Mother's maiden Name *")
    const aadharBox = getByLabelText('Aadhar number *')
    const addressBox = getByLabelText('Address line 1 *')
    const pincodeBox = getByLabelText('Pincode *')
    const stateBox = getByLabelText('State *')
    const cityBox = getByLabelText('City *')

    // Select option from occupation dropdown
    fireEvent.mouseDown(occupationBox)
    const occupationOptions = within(getByRole('listbox'))
    fireEvent.click(occupationOptions.getByText(/salaried/i))
    // Select income radio option
    fireEvent.click(incomeBox)
    fireEvent.click(genderBox)
    fireEvent.change(dobBox, {
      target: { value: '10/22/1990' },
    })
    fireEvent.change(fatherNameBox, { target: { value: 'Father Name' } })
    fireEvent.change(motherNameBox, { target: { value: 'Mother Name' } })
    fireEvent.change(panBox, { target: { value: 'BRSGF1472D' } })
    fireEvent.change(pincodeBox, { target: { value: '345678' } })
    fireEvent.change(aadharBox, { target: { value: '6537238569157654' } })
    fireEvent.change(addressBox, { target: { value: 'test apartment flat 2' } })
    fireEvent.change(stateBox, { target: { value: 'Delhi' } })
    fireEvent.change(cityBox, { target: { value: 'Delhi' } })

    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(queryByText(/Our system isn't cooperating./)).toBeInTheDocument()
      expect(queryByRole('button', { name: 'Close' })).toBeDefined()
    })

    const modalCloseButton = getByRole('button', { name: 'Close' })
    fireEvent.click(modalCloseButton)

    await waitFor(() => {
      expect(
        queryByText(/Our system isn't cooperating./)
      ).not.toBeInTheDocument()
      expect(mockData.mockNavigate).toHaveBeenCalled()
    })
  })
})
