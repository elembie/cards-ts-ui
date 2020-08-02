import React, { FunctionComponent, useEffect } from 'react'
import styles from './PlayerCard.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { AppDispatch } from 'store'
import { getPlayer } from 'store/game/actions'

export interface Props {
    playerId: string
}

const PlayerCard: FunctionComponent<Props> = (props) => {

    const { playerId } = props
    
    const player = useSelector((state: RootState) => state.game.opponents[playerId])
    const dispatch = useDispatch<AppDispatch>()

    const fetchPlayer = playerId.length > 0 && !player

    useEffect(() => {
        if (fetchPlayer) {
            dispatch(getPlayer(playerId))
        }
    }, [dispatch, fetchPlayer, playerId])

    return (
        <div className={styles.base}>
            {player && player.isFetched

                ? (
                    <div>
                        Player: {player.name}
                    </div>

                ) : (

                    <div>
                        Waiting for player
                    </div>
                )}
        </div>
    )
    
}

export default PlayerCard

