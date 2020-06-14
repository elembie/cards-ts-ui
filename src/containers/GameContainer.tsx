import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

interface RouteParams {
    gameId: string
}

const GameContainer: FunctionComponent = () => {

    const params: RouteParams = useParams()

    return (
        <div>
            Game {params.gameId}
        </div>
    )
}

export default GameContainer