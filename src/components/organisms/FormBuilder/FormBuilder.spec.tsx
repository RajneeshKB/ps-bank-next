import React from 'react'
import { useForm } from 'react-hook-form'
import { render } from '@testing-library/react'
import {
  REGISTRATION_BASIC_DEFAULT_VALUES,
  USER_REGISTRATION_BASIC,
} from '../../../utils'
import { FormBuilder } from '.'

const CustomFormBuilder = ({ formControls }: any) => {
  const { control, handleSubmit } = useForm({
    defaultValues: REGISTRATION_BASIC_DEFAULT_VALUES,
  })

  const submitHandlerMock = jest.fn()
  return (
    <FormBuilder
      formControls={formControls}
      submitHandler={handleSubmit(submitHandlerMock)}
      controlHook={control}
    />
  )
}

describe('TS:1 - FormBuilder component', () => {
  it('TC:01 - should render FormBuilder Component successfully', () => {
    const { getAllByRole, getByLabelText } = render(
      <CustomFormBuilder formControls={USER_REGISTRATION_BASIC} />
    )
    expect(getAllByRole('textbox')).toHaveLength(3)
    expect(getByLabelText('Your Full Name *')).toBeInTheDocument()
    expect(getByLabelText('Mobile number *')).toBeInTheDocument()
    expect(getByLabelText('Email *')).toBeInTheDocument()
  })
})
