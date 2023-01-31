import { Theme } from '@mui/material'

export const tabPanelCreditCardStyles = {
  container: {
    backgroundColor: '#e5f5ff',
    padding: (theme: Theme) => theme.spacing(3),
  },
  cardHeader: {
    textAlign: 'center',
    paddingBottom: (theme: Theme) => theme.spacing(0),
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
}
