import React, { FunctionComponent, useEffect, Fragment } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { AppDispatch } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, disconnectSocket, joinGame, getGame } from '../store/game/actions'
import { RootState } from '../store/rootReducer'
import Game from '../views/Game'

interface RouteParams {
    gameId: string
}

const GameContainer: FunctionComponent = () => {

    const user = useSelector((state: RootState) => state.session.user)
    const { 
        hasLeftGame, 
        isLeavingGame, 
        isFetchingGame,
        game 
    } = useSelector((state: RootState) => state.game)
    const { gameId } = useParams<RouteParams>()
    const dispatch = useDispatch<AppDispatch>()

    // socket effect
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

    // get game effect
    useEffect(() => {
        if (!game.isFetched && !isFetchingGame) {
            dispatch(getGame())
        }
    }, [dispatch, game.isFetched, isFetchingGame])

    if (hasLeftGame) {
        return <Redirect to='/' />
    }

    return (
        <Fragment>
            <Game />
        </Fragment>
    )

}

export default GameContainer