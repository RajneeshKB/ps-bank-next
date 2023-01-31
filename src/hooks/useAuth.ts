import { useBankContext } from '../context'
import { getItemFromSession, IS_BROWSER } from '../utils'

export const useAuth = () => {
  const {
    state: { loginData },
  } = useBankContext()

  if (loginData?.AccessToken) {
    return { ...loginData, validContext: true }
  }

  const sessionAccessToken = IS_BROWSER ? sessionStorage.AccessToken : ''
  const sessionCustomerData = getItemFromSession('customerData')
  if (sessionAccessToken && sessionCustomerData?.AccessToken) {
    return { ...sessionCustomerData, validContext: false }
  }

  return {}
}
