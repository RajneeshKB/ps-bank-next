import React, { FC, memo, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { PAGES } from '../../../utils'

interface IHeaderMenuMobileView {
  showMenu: boolean
  selectedMenu: string
  parentPath: string
}

const HeaderMenuMobileView: FC<IHeaderMenuMobileView> = ({
  showMenu,
  selectedMenu,
  parentPath,
}) => {
  const [drawerState, updateOpenDrawer] = useState(false)
  const closeDrawer = () => {
    updateOpenDrawer(false)
  }
  const openDrawer = () => {
    updateOpenDrawer(true)
  }

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <Stack direction="row" alignItems="center">
        {showMenu && (
          <IconButton
            size="large"
            aria-label="bank navigation"
            aria-controls="bank-navigation-bar"
            aria-haspopup="true"
            onClick={openDrawer}
            color="inherit"
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link
          href="/"
          underline="none"
          variant="h1"
          color="primary.contrastText"
        >
          <Typography variant="h1">PS Bank</Typography>
        </Link>
      </Stack>
      <Drawer open={drawerState} onClose={closeDrawer}>
        <List
          sx={{ width: '11rem' }}
          role="menu"
          onClick={closeDrawer}
          onKeyDown={closeDrawer}
        >
          {PAGES.map((page) => (
            <MenuItem
              key={page.label}
              sx={
                selectedMenu === page.href || parentPath === page.href
                  ? {
                      fontSize: '1.5rem',
                      borderBottom: '1px solid #fff',
                    }
                  : {}
              }
            >
              <Link href={page.href} underline="none">
                {page.label}
              </Link>
            </MenuItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default memo(HeaderMenuMobileView)
