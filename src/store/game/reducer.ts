import * as types from './types'

const initialState: types.GameState = {
    _isCreatingGame: false,
}

export const gameReducer = (
    state = initialState,
    action: types.GameActionTypes
): types.GameState => {

    switch(action.type) {

        case types.GAME_CREATING_GAME:
            return {
                ...state,
                _isCreatingGame: true,
            }

        default:
            return state

    }

}