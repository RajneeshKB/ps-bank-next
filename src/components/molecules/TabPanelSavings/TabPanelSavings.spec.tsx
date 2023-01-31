import React from 'react'
import { SavingsPanel } from '.'
import { renderWithRouter } from '../../../utils/test-utils'

describe('TS:1 - SavingsPanel Component', () => {
  it('TC:01 - should not saving panel successfully', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(
      <SavingsPanel />
    )
    expect(
      getByRole('heading', { name: 'Saving Accounts' })
    ).toBeInTheDocument()
    expect(
      getByText(
        /Open a saving account with us and get a lifetime free debit card./
      )
    ).toBeInTheDocument()
    expect(getByRole('link', { name: 'Open Now' })).toBeInTheDocument()
    expect(getAllByRole('list')).toHaveLength(1)
    expect(getAllByRole('listitem')).toHaveLength(2)
  })
})
