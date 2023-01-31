import React, { FC } from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import { footerStyles } from './styles'

const Footer: FC = () => (
  <footer>
    <Box sx={footerStyles.footerWrapperStyles}>
      <Container maxWidth="xl">
        <Stack spacing={1} textAlign="center">
          <Typography variant="body1" color="neutral.contrastText">
            This is a sample application for learning purpose.
          </Typography>
          <Typography variant="body2" color="neutral.contrastText">
            Developed by: Rajneesh Barnwal
          </Typography>
        </Stack>
      </Container>
    </Box>
  </footer>
)

export default Footer
