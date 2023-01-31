import React from 'react'
import { renderWithRouter } from '../../../utils/test-utils'
import { PageLayout } from '.'

describe('TS:1 - PageLayout component', () => {
  it('TC:01 - should render PageLayout Component successfully with header and footer', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(
      <PageLayout>
        <div>Testing page layout</div>
      </PageLayout>
    )
    expect(getAllByRole('heading', { name: 'PS Bank' })).toHaveLength(2)
    expect(getByRole('link', { name: 'Login' })).toBeDefined()
    expect(getByText(/Testing page layout/)).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })
})
