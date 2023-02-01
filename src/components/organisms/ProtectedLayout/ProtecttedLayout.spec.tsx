import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import * as customHooks from '../../../hooks/useAuth'
import ProtectedLayout from './ProtectedLayout'

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

xdescribe('TS:1 - ProtectedLayout component', () => {
  it('TC:01 - should render ProtectedLayout Component successfully', () => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({
      validContext: true,
      AccessToken: 'testToken',
      customerId: 'test123',
      customerName: 'Test User',
      isNewUser: true,
    })
    const { getByText } = renderWithRouter(
      <ProtectedLayout>
        <div>Test</div>
      </ProtectedLayout>
    )
    expect(
      getByText(/This is a sample application for learning purpose./)
    ).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })

  xit('TC:02 - should navigate to root page if user is not authorized', () => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({})
    const { getByText } = renderWithRouter(
      <ProtectedLayout>
        <div>Test</div>
      </ProtectedLayout>
    )
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })

  it('TC:03 - should render loading state if not a valid context but valid data', () => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({
      validContext: false,
      AccessToken: 'testToken',
      customerId: 'test123',
      customerName: 'Test User',
      isNewUser: true,
    })
    const { getByText } = renderWithRouter(
      <ProtectedLayout>
        <div>Test</div>
      </ProtectedLayout>
    )
    expect(getByText(/Loading data, please wait!/)).toBeInTheDocument()
  })

  xit('TC:04 - should navigate if pathname is not valid route', () => {
    jest.mock('next/router', () => ({
      ...jest.requireActual('next/router'),
      useRouter() {
        return {
          route: '/',
          pathname: '/ps-bank/',
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
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({
      validContext: true,
      AccessToken: 'testToken',
      customerId: 'test123',
      customerName: 'Test User',
      isNewUser: false,
    })
    const { getByText } = renderWithRouter(
      <ProtectedLayout>
        <div>Test</div>
      </ProtectedLayout>
    )
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })
})
