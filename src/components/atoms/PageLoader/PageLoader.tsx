import { Container, Skeleton, Stack } from '@mui/material'
import React, { FC } from 'react'

const PageLoader: FC = () => {
  return (
    <Container maxWidth="xl">
      <Stack spacing={4} alignItems="center" my={8}>
        <Skeleton
          variant="rectangular"
          width="90%"
          height={300}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="90%"
          height={100}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="90%"
          height={100}
          animation="wave"
        />
      </Stack>
    </Container>
  )
}

export default PageLoader
