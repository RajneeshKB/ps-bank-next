import { CircularProgress, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'

interface IViewLoaderProps {
  label?: string
}
const ViewLoader: FC<IViewLoaderProps> = ({ label }) => (
  <Stack
    display="flex"
    justifyContent="center"
    alignItems="center"
    margin="4rem"
  >
    <CircularProgress />
    <Typography variant="subtitle1">{label}</Typography>
  </Stack>
)

ViewLoader.defaultProps = {
  label: 'Loading...',
}

export default ViewLoader
