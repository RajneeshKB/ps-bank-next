import React from 'react'
import { useForm } from 'react-hook-form'
import {
  CREDIT_CARD_APPLY_CONTROL_VALUES,
  CREDIT_CARD_APPLY_FORM,
  CREDIT_CARD_APPLY_FORM_DEFAULT_VALUES,
} from '../../../utils'
import { MultiLevelFormBuilder } from '.'
import { renderWithProviders } from '../../../utils/test-utils'

const CustomMultiLevelFormBuilder = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: CREDIT_CARD_APPLY_FORM_DEFAULT_VALUES,
  })

  const submitHandlerMock = jest.fn()
  return (
    <MultiLevelFormBuilder
      formControls={CREDIT_CARD_APPLY_FORM}
      controlValues={CREDIT_CARD_APPLY_CONTROL_VALUES}
      submitHandler={handleSubmit(submitHandlerMock)}
      controlHook={control}
    />
  )
}

describe('TS:1 - MultiLevelFormBuilder component', () => {
  it('TC:01 - should render MultiLevelFormBuilder Component successfully', () => {
    const { getAllByRole, getByLabelText } = renderWithProviders(
      <CustomMultiLevelFormBuilder />
    )
    expect(getAllByRole('textbox')).toHaveLength(13)
    expect(getAllByRole('radiogroup')).toHaveLength(3)
    expect(getAllByRole('radio')).toHaveLength(8)
    expect(getByLabelText('Your Full Name *')).toBeInTheDocument()
    expect(getByLabelText('Mobile number *')).toBeInTheDocument()
    expect(getByLabelText('Email *')).toBeInTheDocument()
  })
})
