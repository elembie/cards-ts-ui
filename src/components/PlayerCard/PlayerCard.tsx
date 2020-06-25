import React, { FunctionComponent } from 'react'
import { Player } from '../../store/game/types'
import styles from './PlayerCard.module.scss'

export interface Props {
    player?: Player
}

const PlayerCard: FunctionComponent<Props> = (props) => {

    const { player } = props

    return (
        <div className={styles.base}>
            {player === undefined

                ? (
                    <div>
                        Waiting for player
                    </div>

                ) : (
                    
                    <div>
                        Player: {player.name}
                    </div>
                )}
        </div>
    )
    
}

export default PlayerCard

