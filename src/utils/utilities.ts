import createCache from '@emotion/cache'

export const IS_BROWSER = typeof document !== 'undefined'

export const createEmotionCache = () => {
  let insertionPoint

  if (IS_BROWSER) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({ key: 'mui-style', insertionPoint })
}

export const getItemFromSession = (key: string) => {
  try {
    const sessionData = IS_BROWSER ? sessionStorage.getItem(key) : null
    if (sessionData) {
      return JSON.parse(sessionData)
    }
    return null
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('parsing error', e)
  }
  return null
}

export const formatDisplayWithStar = (_data: string) => {
  const idx = _data.length - 4
  const result = _data.split('')
  result.splice(0, idx, '*'.repeat(idx)).join('')
  return result
}

export const getMaskedCardNumber = (_data: string) => {
  if (!_data) return ''
  const splittedData = _data.split('')
  splittedData.splice(0, 12, 'X'.repeat(12))
  return splittedData
    ?.join('')
    ?.match(/.{1,4}/g)
    ?.join('  ')
}

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate()

export const calculateDate = (_date: Date, range: number) => {
  const date = new Date(_date)
  date.setDate(1)
  date.setMonth(date.getMonth() + range)
  date.setDate(
    Math.min(
      _date.getDate(),
      getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    )
  )
  return date.toISOString()
}
