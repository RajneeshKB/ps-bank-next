import React from 'react'
import { render } from '@testing-library/react'
import { GenericErrorModal } from '.'

describe('TS:1 - GenericErrorModal Component', () => {
  it('TC:01 - should render success modal successfully', () => {
    const { getByText, getByRole } = render(
      <GenericErrorModal showModal onCloseClick={jest.fn()} />
    )
    expect(getByText(/Our system isn't cooperating./)).toBeInTheDocument()
    expect(
      getByText(
        /There is a problem on our end. It should'nt last long so please try again shortly./
      )
    ).toBeInTheDocument()
    expect(getByRole('button', { name: 'Close' })).toBeDefined()
  })
})
