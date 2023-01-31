import { IS_BROWSER } from '@/utils'
import { Dispatch } from 'react'
import {
  LOGOUT_CUSTOMER,
  SET_LOGIN_DATA,
  SET_REGISTRATION_DETAILS,
} from './actions'

export type RegistrationDetailType = {
  customerName: string
  customerEmail: string
  customerMob: string
}
export type LoginDataType = {
  customerId: string
  customerName: string
  AccessToken: string
  isNewUser: boolean
}
export type CombinedContextStateType = {
  registrationData: RegistrationDetailType
  loginData: LoginDataType
}
export type BankContextType = {
  state: CombinedContextStateType
  dispatch: Dispatch<{ type: string; payload: any }>
}

export const initialState = {
  registrationData: { customerName: '', customerEmail: '', customerMob: '' },
  loginData: {
    customerId: '',
    customerName: '',
    AccessToken: '',
    isNewUser: false,
  },
}

export const reducer = (
  state: CombinedContextStateType,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_REGISTRATION_DETAILS:
      return { ...state, registrationData: { ...action.payload } }

    case SET_LOGIN_DATA:
      if (action.payload?.AccessToken) {
        if (IS_BROWSER) {
          sessionStorage.setItem('customerData', JSON.stringify(action.payload))
          sessionStorage.setItem('AccessToken', action.payload.AccessToken)
        }
        return {
          ...state,
          loginData: { ...action.payload },
        }
      }
      return state

    case LOGOUT_CUSTOMER:
      if (IS_BROWSER) {
        sessionStorage.clear()
      }
      return { ...initialState }

    default:
      return state
  }
}
