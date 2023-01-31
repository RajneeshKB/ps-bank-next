import React, { FC, ReactElement } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MockedProvider } from '@apollo/client/testing'
import { render, RenderOptions } from '@testing-library/react'
import { BankContextProvider } from '../context'

/** interface type for render option being received as prop from test file */
interface ExtendedRenderOption extends Omit<RenderOptions, 'wrapper'> {
  bankConextValue?: any
  graphQlResponseMocks?: any[]
}
/**
 * This function is used to wrap component with all required providers available in application
 * @params ui : component to be wrapped
 * @params {} of type ExtendedRenderOption with values to set in store and context
 */
const renderWithProviders = (
  ui: ReactElement,
  {
    bankConextValue = undefined,
    graphQlResponseMocks = [],
    ...renderOptions
  }: ExtendedRenderOption = {}
) => {
  /** compoent with all provider wrapped with received or default values */
  const AllTheProviders: FC<{
    children: React.ReactElement
  }> = ({ children }) => {
    return (
      <MockedProvider addTypename={false} mocks={graphQlResponseMocks}>
        <BankContextProvider initialStateValue={bankConextValue}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </BankContextProvider>
      </MockedProvider>
    )
  }
  return {
    ...render(ui, {
      wrapper: AllTheProviders,
      ...renderOptions,
    }),
  }
}

/** utility function to wrap component with router and all providers */
const renderWithRouter = (
  ui: ReactElement,
  { route = '/' } = {},
  renderOptions: ExtendedRenderOption = {}
) => {
  return {
    ...renderWithProviders(<>{ui}</>, renderOptions),
  }
}

export { renderWithProviders }
export { renderWithRouter }
