import React, { FunctionComponent } from 'react'
import styles from './Game.module.scss'
import PlayerCard from '../../components/PlayerCard'
import Table from '../../components/Table'

const Game: FunctionComponent = () => {
    return (
        <div className={styles.base}>
            <div className={styles.rows}>

                <div className={styles.top}>
                    <div className={styles.side}/>

                    <div className={styles.playersTop}>
                        
                        <div className={styles.playerContainer}>
                            <PlayerCard />
                        </div>

                        <div className={styles.playerContainer}>
                            <PlayerCard />
                        </div>

                        <div className={styles.playerContainer}>
                            <PlayerCard />
                        </div>

                    </div>

                    <div className={styles.side}/>

                </div>

                <div className={styles.middle}>

                    <div className={styles.side}>
                        
                        <div className={styles.playerContainer}>
                            <PlayerCard />
                        </div>

                        <div className={styles.playerContainer}>
                            <PlayerCard />
                        </div>

                    </div>

                    <div className={styles.center}>
                        <Table />
                    </div>

                    <div className={styles.side}>

                        <div className={styles.playerContainer}>
                            <PlayerCard />
                        </div>

                        <div className={styles.playerContainer}>
                            <PlayerCard />
                        </div>

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