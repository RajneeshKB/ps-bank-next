import { IS_BROWSER } from '@/utils'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const API_ENDPOINT = 'https://ps-bank.azurewebsites.net/graphql'

const httpLink = createHttpLink({
  uri: API_ENDPOINT,
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = IS_BROWSER ? sessionStorage.getItem('AccessToken') : ''
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const getBankGraphQlClient = () => {
  const graphQLClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return graphQLClient
}
