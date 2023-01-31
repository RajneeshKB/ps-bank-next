import { fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { ContextMenu } from '.'
import { renderWithRouter } from '../../../utils/test-utils'

describe('TS:1 - ContextMenu Component', () => {
  it('TC:01 - should render context menu successfully with closed state', () => {
    const { queryByText, getByRole } = renderWithRouter(<ContextMenu />)
    expect(getByRole('button')).toBeInTheDocument()
    expect(queryByText('Profile')).not.toBeInTheDocument()
    expect(queryByText('Logout')).not.toBeInTheDocument()
  })

  it('TC:02 - should render context menu in open state on click of button', async () => {
    const { getByText, getByRole } = renderWithRouter(<ContextMenu />)
    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(getByText('Profile')).toBeInTheDocument()
      expect(getByText('Logout')).toBeInTheDocument()
    })
  })

  it('TC:03 - should dispatch logout event and render context menu in closed state on click of logout button', async () => {
    const { getByText, getByRole, queryByText } = renderWithRouter(
      <ContextMenu />
    )
    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(getByText('Profile')).toBeInTheDocument()
      const logouButton = getByText('Logout')
      expect(logouButton).toBeInTheDocument()
      fireEvent.click(logouButton)
    })

    await waitFor(() => {
      expect(queryByText('Profile')).not.toBeInTheDocument()
      expect(queryByText('Logout')).not.toBeInTheDocument()
    })
  })
})
