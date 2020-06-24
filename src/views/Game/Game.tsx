import React, { FunctionComponent } from 'react'
import styles from './Game.module.scss'

const Game: FunctionComponent = () => {
    return (
        <div className={styles.base}>
            <div className={styles.rows}>
                <div className={styles.top}>
                    Top
                </div>
                <div className={styles.middle}>
                    <div className={styles.side}>
                        Players col
                    </div>
                    <div className={styles.center}>
                        Players and table col
                    </div>
                    <div className={styles.side}>
                        Players col
                    </div>
                </div>
                <div className={styles.hand}>
                    Hand row
                </div>
            </div>
        </div>
    )
}

export default Game