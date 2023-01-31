import { Theme } from '@mui/material'

export const accountsEnrollmentStyles = {
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: (theme: Theme) => theme.spacing(8),
  },
}
