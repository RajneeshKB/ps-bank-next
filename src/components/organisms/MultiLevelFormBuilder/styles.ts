import { Theme } from '@mui/material'

export const multiLevelFormBuilderStyles = {
  stepTitle: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    padding: (theme: Theme) => theme.spacing(2),
  },
  stepDivider: {
    backgroundColor: 'primary.dark',
    height: '2px',
    marginTop: (theme: Theme) => theme.spacing(6),
  },
}
