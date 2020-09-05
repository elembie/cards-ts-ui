import React, { FunctionComponent, useEffect } from 'react'
import styles from './PlayerCard.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { AppDispatch } from 'store'
import { getPlayer } from 'store/game/actions'
import { getPlayerStatusString } from 'games/logic'

export interface Props {
    playerId: string
}

const PlayerCard: FunctionComponent<Props> = (props) => {

    const { playerId } = props
    const dispatch = useDispatch<AppDispatch>()

    const gameType = useSelector((state: RootState) => state.game.meta.gameType)
    const player = useSelector((state: RootState) => state.game.opponents[playerId])

    const statusString = getPlayerStatusString(playerId, gameType)

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
                    <div className={styles.container}>
                        <p className={styles.name}>{player.name}</p>
                        <p className={styles.status}>{statusString}</p>
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

