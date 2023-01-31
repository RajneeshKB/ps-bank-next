import React from 'react'
import { DesktopMenuView } from '.'
import { renderWithRouter } from '../../../utils/test-utils'

describe('TS:1 - DesktopMenuView Component', () => {
  it('TC:01 - should not render navigation menu successfully with bank link', () => {
    const { getAllByRole, queryByRole } = renderWithRouter(
      <DesktopMenuView showMenu={false} selectedMenu="" parentPath="" />
    )
    expect(getAllByRole('link')).toHaveLength(1)
    expect(queryByRole('menu')).toBeNull()
    expect(queryByRole('menuitem')).toBeNull()
  })

  it('TC:02 - should render navigation menu with bank link', async () => {
    const { getAllByRole } = renderWithRouter(
      <DesktopMenuView showMenu selectedMenu="" parentPath="" />
    )
    expect(getAllByRole('link')).toHaveLength(5)
    expect(getAllByRole('menu')).toHaveLength(1)
    expect(getAllByRole('menuitem')).toHaveLength(4)
  })
})
