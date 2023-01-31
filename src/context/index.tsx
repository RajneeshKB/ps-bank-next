/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, FC, useContext, useReducer } from 'react'
import {
  BankContextType,
  CombinedContextStateType,
  initialState,
  reducer,
} from './reducers'

type BankContextProviderProps = {
  children: React.ReactElement
  initialStateValue?: CombinedContextStateType
}

export const BankContext = createContext<BankContextType>({
  state: initialState,
  dispatch: () => {},
})

export const BankContextProvider: FC<BankContextProviderProps> = ({
  children,
  initialStateValue,
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateValue || initialState
  )
  return (
    <BankContext.Provider value={{ state, dispatch }}>
      {children}
    </BankContext.Provider>
  )
}

BankContextProvider.defaultProps = {
  initialStateValue: undefined,
}

export const useBankContext = () => useContext(BankContext)
