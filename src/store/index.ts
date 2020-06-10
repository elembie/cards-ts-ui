import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import * as reduxLogger from 'redux-logger'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    reduxLogger.createLogger()
  ]
})

export type AppDispatch = typeof store.dispatch

export default store