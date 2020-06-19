import React, { FunctionComponent, useState, useEffect } from 'react'
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
    const { isJoiningGame } = useSelector((state: RootState) => state.game)

    useEffect(() => {

        if (isJoiningGame) {
            dispatch(joinGame(gameId))
        }

        dispatch(connectSocket())
        return () => {
            dispatch(disconnectSocket(gameId))
        }
        
    }, [dispatch, gameId, isJoiningGame])

    if (!isJoiningGame && (!user.inGame || !(user.gameId && user.gameId === gameId ))) {
        return <Redirect to='/'/>
    } else {
        return (
            <div>
                Game {gameId}
            </div>
        )
    }
    
    
}

export default GameContainer