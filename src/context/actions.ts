import type { LoginDataType, RegistrationDetailType } from './reducers'

export const SET_REGISTRATION_DETAILS = 'bank/registration_basic'
export const SET_LOGIN_DATA = 'bank/login_data'
export const LOGOUT_CUSTOMER = 'bank/logout'

export const setRegistrationDetails = (
  customerDetails: RegistrationDetailType
) => ({
  type: SET_REGISTRATION_DETAILS,
  payload: customerDetails,
})

export const setLoginData = (loginData: LoginDataType) => ({
  type: SET_LOGIN_DATA,
  payload: loginData,
})

export const logoutCustomer = () => ({ type: LOGOUT_CUSTOMER, payload: null })
