import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import UnprotectedLayout from './UnprotectedLayout'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter() {
    return {
      route: '/',
      pathname: '/ps-bank/reset',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }
  },
}))

xdescribe('TS:1 - UnprotectedLayout component', () => {
  it('TC:01 - should render UnprotectedLayout Component successfully', () => {
    const { getByText } = renderWithRouter(
      <UnprotectedLayout>
        <div>Test</div>
      </UnprotectedLayout>
    )
    expect(
      getByText(/This is a sample application for learning purpose./)
    ).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })

  xit('TC:02 - should navigate if user is authenticated', () => {
    const { getByText } = renderWithRouter(
      <UnprotectedLayout>
        <div>Test</div>
      </UnprotectedLayout>,
      {},
      {
        bankConextValue: {
          loginData: {
            AccessToken: 'test',
            customerId: 'c123',
            isNewUser: false,
          },
        },
      }
    )
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })

  xit('TC:02 - should navigate if user is authenticated for new users', () => {
    const { getByText } = renderWithRouter(
      <UnprotectedLayout>
        <div>Test</div>
      </UnprotectedLayout>,
      {},
      {
        bankConextValue: {
          loginData: {
            AccessToken: 'test',
            customerId: 'c123',
            isNewUser: true,
          },
        },
      }
    )
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })
})
