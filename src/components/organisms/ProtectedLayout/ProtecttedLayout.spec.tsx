import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import * as customHooks from '../../../hooks/useAuth'
import ProtectedLayout from './ProtectedLayout'

const mockData = { mockNavigate: jest.fn() }
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockData.mockNavigate,
//   Navigate: () => <div>Mock navigate component</div>,
//   useLocation: () => ({ pathname: '/ps-bank/reset' }),
// }))

xdescribe('TS:1 - ProtectedLayout component', () => {
  it('TC:01 - should render ProtectedLayout Component successfully', () => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({
      validContext: true,
      AccessToken: 'testToken',
      customerId: 'test123',
      customerName: 'Test User',
      isNewUser: true,
    })
    const { getByText } = renderWithRouter(<ProtectedLayout />)
    expect(
      getByText(/This is a sample application for learning purpose./)
    ).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })

  it('TC:02 - should navigate to root page if user is not authorized', () => {
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({})
    const { getByText } = renderWithRouter(<ProtectedLayout />)
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
    const { getByText } = renderWithRouter(<ProtectedLayout />)
    expect(getByText(/Loading data, please wait!/)).toBeInTheDocument()
  })

  xit('TC:04 - should navigate if pathname is not valid route', () => {
    // jest.mock('react-router-dom', () => ({
    //   ...jest.requireActual('react-router-dom'),
    //   useNavigate: () => mockData.mockNavigate,
    //   Navigate: () => <div>Mock navigate component</div>,
    //   useLocation: () => ({ pathname: '/ps-bank/' }),
    // }))
    jest.spyOn(customHooks, 'useAuth').mockReturnValue({
      validContext: true,
      AccessToken: 'testToken',
      customerId: 'test123',
      customerName: 'Test User',
      isNewUser: false,
    })
    const { getByText } = renderWithRouter(<ProtectedLayout />)
    expect(getByText(/Mock navigate component/)).toBeInTheDocument()
  })
})
