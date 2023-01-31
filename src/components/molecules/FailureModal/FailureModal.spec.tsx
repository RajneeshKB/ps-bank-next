import React from 'react'
import { render } from '@testing-library/react'
import { FailureModal } from '.'

describe('TS:1 - FailureModal Component', () => {
  it('TC:01 - should render failure modal successfully', () => {
    const { getByText, getByRole } = render(
      <FailureModal
        showModal
        onCloseClick={jest.fn()}
        title={<div>Failed</div>}
        description={<div>Process failed</div>}
      />
    )
    expect(getByText(/Failed/)).toBeInTheDocument()
    expect(getByText(/Process failed/)).toBeInTheDocument()

    expect(getByRole('button', { name: 'Close' })).toBeDefined()
  })
})
