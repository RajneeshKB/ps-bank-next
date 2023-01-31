import * as React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { createEmotionCache } from '@/utils'
import { bankTheme } from '@/theme/psBankTheme'
import { ErrorBoundary } from '@/components/molecules/ErrorBoundary'
import { ApolloProvider } from '@apollo/client'
import { getBankGraphQlClient } from '@/graphql/client'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BankContextProvider } from '@/context'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const queryClient = getBankGraphQlClient()

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ErrorBoundary>
        <ThemeProvider theme={bankTheme}>
          <CssBaseline />
          <ApolloProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <BankContextProvider>
                <Component {...pageProps} />
              </BankContextProvider>
            </LocalizationProvider>
          </ApolloProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </CacheProvider>
  )
}

export default MyApp
