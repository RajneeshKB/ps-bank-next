import React from 'react'
// import mediaQuery from 'css-mediaquery'
import { renderWithRouter } from '../../../utils/test-utils'
import { Header } from '.'

// function createMatchMedia(width: number) {
//   return (query: string) => ({
//     matches: mediaQuery.match(query, { width }) as boolean,
//     media: '',
//     addListener: () => {},
//     removeListener: () => {},
//     onchange: () => {},
//     addEventListener: () => {},
//     removeEventListener: () => {},
//     dispatchEvent: () => true,
//   })
// }

describe('TS:1 - Header component', () => {
  // beforeAll(() => {
  //   window.matchMedia = createMatchMedia(1000)
  // })

  it('TC:01 - should render Header Component successfully', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<Header />)
    expect(getAllByRole('heading', { name: 'PS Bank' })).toHaveLength(2)
    expect(getByRole('link', { name: 'Login' })).toBeDefined()
  })
})
