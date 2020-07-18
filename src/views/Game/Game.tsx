import React, { FunctionComponent, useEffect } from 'react'
import styles from './Game.module.scss'
import PlayerCard from '../../components/PlayerCard'
import Table from '../../components/Table'
import Constants from '../../config/constants'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import Hand from '../../components/Hand'
import PlayerTable from '../../components/PlayerTable'

const Game: FunctionComponent = () => {

    const { 
        meta: {
            tableSize,
            players,
        },
        player: {
            id: playerId
        }
    } = useSelector((state: RootState) => state.game)

    const { 
        user: {
            id
        } 
    } = useSelector((state: RootState) => state.session)
    const seats = Constants.seatConfig[tableSize] 

    while(players.length < tableSize) {
        players.push('')
    }

    const pidx = players.indexOf(id)
    const reversed = players.slice(pidx+1, players.length).concat(players.slice(0, pidx)).reverse()
    const ordered = seats.map(active => active ? reversed.pop() : '')

    return (
        <div className={styles.base}>
            <div className={styles.rows}>

                <div className={styles.top}>
                    <div className={styles.side}/>

                    <div className={styles.playersTop}>
                        
                        {seats[2] && (
                            <div className={styles.player}>
                                <PlayerTable playerId={ordered[2]} orientation="d"/>
                                <PlayerCard playerId={ordered[2] || ''}/>
                            </div>
                        )}


                        {seats[3] && (
                            <div className={styles.player}>
                                <PlayerTable playerId={ordered[3]} orientation="d"/>
                                <PlayerCard playerId={ordered[3] || ''}/>
                            </div>
                        )}


                        {seats[4] && (
                            <div className={styles.player}>
                                <PlayerTable playerId={ordered[4]} orientation="d"/>
                                <PlayerCard playerId={ordered[4] || ''}/>
                            </div>
                        )}


                    </div>

                    <div className={styles.side}/>

                </div>

                <div className={styles.middle}>

                    <div className={styles.side}>
                        
                        {seats[1] && (
                            <div className={styles.player}>
                                <PlayerTable playerId={ordered[1]} orientation="r"/>
                                <PlayerCard playerId={ordered[1] || ''}/>
                            </div>
                        )}

                        {seats[0] && (
                            <div className={styles.player}>
                                <PlayerTable playerId={ordered[0]} orientation="r"/>
                                <PlayerCard playerId={ordered[0] || ''}/>
                            </div>
                        )}

                    </div>

                    <div className={styles.center}>
                        <Table />
                    </div>

                    <div className={styles.side}>

                        {seats[5] && (
                            <div className={styles.player}>
                                <PlayerTable playerId={ordered[5]} orientation="l"/>
                                <PlayerCard playerId={ordered[5] || ''}/>
                            </div>
                        )}


                        {seats[6] && (
                            <div className={styles.player}>
                                <PlayerTable playerId={ordered[6]} orientation="l"/>
                                <PlayerCard playerId={ordered[6] || ''}/>
                            </div>
                        )}


                    </div>

                </div>

                <div className={styles.hand}>
                    <PlayerTable playerId={playerId} orientation='u'/>
                    <Hand cards={[]}/>
                </div>
            </div>
        </div>
    )
}

export default Game