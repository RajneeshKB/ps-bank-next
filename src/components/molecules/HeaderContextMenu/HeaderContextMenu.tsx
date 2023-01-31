import React, { FC, memo } from 'react'
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useBankContext } from '../../../context'
import { logoutCustomer } from '../../../context/actions'

const HeaderContextMenu: FC = () => {
  const { dispatch } = useBankContext()
  const logoutCustomerAndResetSession = () => {
    dispatch(logoutCustomer())
  }
  const [anchorCustomerMenu, updateAnchorCustomerMenu] =
    React.useState<null | HTMLElement>(null)

  const handleOpenCustomerMenu = (event: React.MouseEvent<HTMLElement>) => {
    updateAnchorCustomerMenu(event.currentTarget)
  }
  const handleCloseCustomerMenu = () => {
    updateAnchorCustomerMenu(null)
  }

  return (
    <Box sx={{ flexGrow: 0, ml: '1rem' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenCustomerMenu} sx={{ p: 0 }}>
          <AccountCircleIcon
            fontSize="large"
            sx={{ color: 'primary.contrastText' }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="bank-navigation-bar"
        anchorEl={anchorCustomerMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorCustomerMenu)}
        onClose={handleCloseCustomerMenu}
      >
        <MenuItem onClick={handleCloseCustomerMenu}>
          <Link href="profile" underline="none">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseCustomerMenu}>
          <Button
            variant="contained"
            color="secondary"
            onClick={logoutCustomerAndResetSession}
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default memo(HeaderContextMenu)
