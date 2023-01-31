import { Container } from '@mui/material'
import React, { FC } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'

interface IPageLayoutProps {
  children: React.ReactNode
}

const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="xl" sx={{ py: '1.5rem' }}>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default PageLayout
