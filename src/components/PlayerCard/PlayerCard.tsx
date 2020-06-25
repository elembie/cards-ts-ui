import React, { FunctionComponent } from 'react'
import { Player } from '../../store/game/types'
import styles from './PlayerCard.module.scss'

export interface Props {
    playerId: string
}

const PlayerCard: FunctionComponent<Props> = (props) => {

    const { playerId } = props

    return (
        <div className={styles.base}>
            {playerId.length === 0

                ? (
                    <div>
                        Waiting for player
                    </div>

                ) : (

                    <div>
                        Player: {playerId}
                    </div>
                )}
        </div>
    )
    
}

export default PlayerCard

