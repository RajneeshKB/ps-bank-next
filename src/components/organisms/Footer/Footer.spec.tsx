import React from 'react'
import { render } from '@testing-library/react'
import { Footer } from '.'

describe('TS:1 - Bank app component', () => {
  it('TC:01 - should render Footer Component successfully', () => {
    const { getByText } = render(<Footer />)
    expect(
      getByText(/This is a sample application for learning purpose./)
    ).toBeInTheDocument()
    expect(getByText(/Developed by: Rajneesh Barnwal/)).toBeInTheDocument()
  })
})
