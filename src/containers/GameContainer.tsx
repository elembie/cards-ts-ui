import React, { FunctionComponent, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { AppDispatch } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, disconnectSocket, joinGame } from '../store/game/actions'
import { RootState } from '../store/rootReducer'

interface RouteParams {
    gameId: string
}

const GameContainer: FunctionComponent = () => {

    const { gameId } = useParams<RouteParams>()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.session.user)
    const { hasLeftGame, isLeavingGame } = useSelector((state: RootState) => state.game)

    useEffect(() => {

        if (!(hasLeftGame || isLeavingGame)) {
            if (user.inGame) {
                dispatch(connectSocket())
            } else {
                dispatch(joinGame(gameId))
            }
        }
        
        return () => {
            dispatch(disconnectSocket(gameId))
        }
        
    }, [dispatch, gameId, hasLeftGame, isLeavingGame, user.inGame])

    if (hasLeftGame) {
        return <Redirect to='/' />
    }

    return (
        <div>
            Game {gameId}
        </div>
    )

    
    
}

export default GameContainer