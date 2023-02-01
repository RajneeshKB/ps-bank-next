// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch'
import '@testing-library/jest-dom/extend-expect'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }
  },
}))
