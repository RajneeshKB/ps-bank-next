import { Theme } from '@mui/material'

export const headerStyles = {
  headerWrapperStyles: {
    backgroundColor: 'primary.dark',
    padding: (theme: Theme) => `${theme.spacing(2)} ${theme.spacing(0)}`,
  },
}
