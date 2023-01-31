import React, { FC } from 'react'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { useBankContext } from '../../../context'
import { headerStyles } from './styles'
import { useRouter } from 'next/router'
import { MobileMenuView } from '@/components/molecules/HeaderMenuMobileView'
import { DesktopMenuView } from '@/components/molecules/HeaderMenuDesktopView'
import { ContextMenu } from '@/components/molecules/HeaderContextMenu'
import { NextLinkComposed } from '@/components/atoms/CustomRouterLink/CustomRouterLink'

const Header: FC = () => {
  const {
    state: {
      loginData: { AccessToken },
    },
  } = useBankContext()

  const { pathname } = useRouter()
  const splittedPath = pathname?.split('/')
  const currentPath = splittedPath?.length
    ? splittedPath[splittedPath.length - 1]
    : ''
  const parentPath =
    splittedPath?.length > 1 ? splittedPath[splittedPath.length - 2] : ''

  return (
    <AppBar position="static" sx={headerStyles.headerWrapperStyles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileMenuView
            showMenu={!!AccessToken}
            selectedMenu={currentPath}
            parentPath={parentPath}
          />
          <DesktopMenuView
            showMenu={!!AccessToken}
            selectedMenu={currentPath}
            parentPath={parentPath}
          />
          {AccessToken ? (
            <ContextMenu />
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                to="/login"
                component={NextLinkComposed}
                variant="contained"
                color="success"
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
