import React from 'react'
import { fireEvent, waitFor, within } from '@testing-library/react'
import { renderWithRouter } from '../../../utils/test-utils'
import { UserRegistrationDetailsForm } from '.'

const mockProps = {
  mockBasicData: {
    customerName: 'Test name',
    customerMob: '7892341234',
    customerEmail: 'test@test.com',
  },
  mockFormSubmit: jest.fn(),
}

describe('TS:1 - UserRegistrationDetailsForm component', () => {
  it('TC:01 - should render UserRegistrationDetailsForm Component successfully', () => {
    const { getAllByRole } = renderWithRouter(
      <UserRegistrationDetailsForm
        basicRegistrationData={mockProps.mockBasicData}
        formSubmitCallback={mockProps.mockFormSubmit}
      />
    )
    expect(getAllByRole('textbox')).toHaveLength(13)
    expect(getAllByRole('button')).toHaveLength(4)
    expect(getAllByRole('radiogroup')).toHaveLength(2)
    expect(getAllByRole('radio')).toHaveLength(6)
  })

  it('TC:02 - should not call submit function on if form is not valid when submitted', async () => {
    jest.spyOn(mockProps, 'mockFormSubmit')
    const { getByRole } = renderWithRouter(
      <UserRegistrationDetailsForm
        basicRegistrationData={mockProps.mockBasicData}
        formSubmitCallback={mockProps.mockFormSubmit}
      />
    )
    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockProps.mockFormSubmit).not.toHaveBeenCalled()
    })
  })

  it('TC:03 - should call submit function on if form is valid when submitted', async () => {
    jest.spyOn(mockProps, 'mockFormSubmit')
    const { getByRole, getAllByRole, getByLabelText } = renderWithRouter(
      <UserRegistrationDetailsForm
        basicRegistrationData={mockProps.mockBasicData}
        formSubmitCallback={mockProps.mockFormSubmit}
      />
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
    // const countryBox = getByLabelText('Country *')

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
    // Select option from country dropdown
    // fireEvent.mouseDown(countryBox)
    // const countryOptions = within(getByRole('listbox'))
    // fireEvent.click(countryOptions.getByText(/India/i))

    const submitButton = getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockProps.mockFormSubmit).toHaveBeenCalled()
    })
  })
})
