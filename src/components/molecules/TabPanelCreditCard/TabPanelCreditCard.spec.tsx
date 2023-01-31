import React from 'react'
import { CreditCardPanel } from '.'
import { renderWithRouter } from '../../../utils/test-utils'

describe('TS:1 - CreditCardPanel Component', () => {
  it('TC:01 - should credit cards successfully', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(
      <CreditCardPanel />
    )
    expect(getByRole('heading', { name: 'Credit Cards' })).toBeInTheDocument()
    expect(
      getByText(
        /Apply for a new credit card and earn benefits and reward points./
      )
    ).toBeInTheDocument()
    expect(getByRole('link', { name: 'Apply Now' })).toBeInTheDocument()
    expect(getAllByRole('list')).toHaveLength(1)
    expect(getAllByRole('listitem')).toHaveLength(2)
  })
})
