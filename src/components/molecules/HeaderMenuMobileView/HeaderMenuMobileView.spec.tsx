import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { MobileMenuView } from '.'
import { renderWithRouter } from '../../../utils/test-utils'

describe('TS:1 - MobileMenuView Component', () => {
  it('TC:01 - should not render navigation menu successfully with bank link', () => {
    const { getAllByRole, queryByRole } = renderWithRouter(
      <MobileMenuView showMenu selectedMenu="" parentPath="" />
    )
    expect(getAllByRole('link')).toHaveLength(1)
    expect(getAllByRole('button')).toHaveLength(1)
    expect(queryByRole('menu')).toBeNull()
    expect(queryByRole('menuitem')).toBeNull()
  })

  it('TC:02 - should render navigation menu on button click', async () => {
    const { getAllByRole, getByRole } = renderWithRouter(
      <MobileMenuView showMenu selectedMenu="" parentPath="" />
    )
    const menuButton = getByRole('button')
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(getAllByRole('link')).toHaveLength(4)
      expect(getAllByRole('menu')).toHaveLength(1)
      expect(getAllByRole('menuitem')).toHaveLength(4)
    })
  })

  it('TC:03 - should render navigation menu on button click and close on click of menuitem', async () => {
    const { getAllByRole, getByRole, queryByRole } = renderWithRouter(
      <MobileMenuView showMenu selectedMenu="" parentPath="" />
    )
    const menuButton = getByRole('button')
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(getAllByRole('link')).toHaveLength(4)
      expect(getAllByRole('menu')).toHaveLength(1)
      const menuItems = getAllByRole('menuitem')
      expect(menuItems).toHaveLength(4)
      fireEvent.click(menuItems[0])
    })
    await waitFor(() => {
      expect(getAllByRole('link')).toHaveLength(1)
      expect(getAllByRole('button')).toHaveLength(1)
      expect(queryByRole('menu')).toBeNull()
      expect(queryByRole('menuitem')).toBeNull()
    })
  })
})
