import { configureStore, Action } from '@reduxjs/toolkit'
import * as reduxLogger from 'redux-logger'
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk'
import rootReducer, { RootState } from './rootReducer'
import { SessionActionTypes } from './session/types'
import { GameActionTypes } from './game/types'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type AppActions = SessionActionTypes
  | GameActionTypes

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    reduxLogger.createLogger(),
    thunk as ThunkMiddleware<RootState, AppActions>,
  ]
})

export type AppDispatch = typeof store.dispatch

export default store