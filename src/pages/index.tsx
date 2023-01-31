import Head from 'next/head'
import { Container, Paper } from '@mui/material'
import { UnprotectedLayout } from '@/components/organisms/UnprotectedLayout'
import { UserRegistrationBasicForm } from '@/components/organisms/UserRegistrationBasic'
import { FC } from 'react'

const CustomerDashboardStyles = {
  paperContainer: {
    backgroundImage: `url('/ps-background.webp')`,
    minHeight: '88vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>PS Bank</title>
        <meta name="description" content="Sample learning bank application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UnprotectedLayout>
        <Paper sx={CustomerDashboardStyles.paperContainer}>
          <Container maxWidth="xl">
            <UserRegistrationBasicForm />
          </Container>
        </Paper>
      </UnprotectedLayout>
    </>
  )
}

export default Home
