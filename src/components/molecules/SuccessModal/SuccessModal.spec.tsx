import React from 'react'
import { render } from '@testing-library/react'
import { SuccessModal } from '.'

describe('TS:1 - SuccessModal Component', () => {
  it('TC:01 - should render success modal successfully', () => {
    const { getByText, getByRole } = render(
      <SuccessModal
        showModal
        onCloseClick={jest.fn()}
        title={<div>Success</div>}
        description={<div>Process successful</div>}
      />
    )
    expect(getByText(/Success/)).toBeInTheDocument()
    expect(getByText(/Process successful/)).toBeInTheDocument()

    expect(getByRole('button', { name: 'Close' })).toBeDefined()
  })
})
