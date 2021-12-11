import { createContext, useReducer } from 'react'
import * as red from './authReducer'
import { GeneralReducer } from './generalReducer'
import * as interfaces from '../interfaces/storeInterfaces'
import { state } from './states'

//Combine all objects.
const initialState: any = state

//Create store.
export const MainStore = createContext<any>(initialState)

//Combine all reducers.
const combineReducers =
   (...reducers: Function[]) =>
   (state: interfaces.IInitialState = initialState, action: interfaces.IAction) => {
      for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action)
      return state
   }

const allReducers = combineReducers(
   GeneralReducer,
   red.AuthReducer,
   red.VerificationReducer,
   red.RegisterVerification,
   red.LoginReducer
)

//Provide store in all elements.
export function StoreProvider(props: JSX.ElementChildrenAttribute): JSX.Element {
   const [state, dispatch] = useReducer(allReducers, initialState)
   return <MainStore.Provider value={{ state, dispatch }}>{props.children}</MainStore.Provider>
}
