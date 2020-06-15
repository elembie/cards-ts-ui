import { combineReducers } from '@reduxjs/toolkit'
import { sessionReducer } from './session/reducer'
import { gameReducer } from './game/reducer'

const rootReducer = combineReducers({
    session: sessionReducer,
    game: gameReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer