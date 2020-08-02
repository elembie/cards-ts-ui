import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from './Table.module.scss'
import ActionButton from 'components/ActionButton'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { getActionButtonProps } from 'games/logic'
import { ICard } from 'games/types'
import CardPile from 'components/CardPile'
import PlayerTable from 'components/PlayerTable'

interface Props {
    seats : boolean[],
    opponents: (string | undefined)[]
}

const Table: FunctionComponent<Props> = (props) => {

    const { seats, opponents } = props

    const { 
        meta: { gameType }, 
        state: { stack },
         players, 
         player
    } = useSelector((state: RootState) => state.game)

    const { show, text, action } = getActionButtonProps(gameType)

    const [ stackCards, setStackCards ] = useState<ICard[]>([])

    useEffect(() => {
        const stackGen: ICard[] = []
        const max = stack > 10 ? 10 : stack
        for (var i=0; i<max; i++) {
            stackGen.push({} as ICard)
        }
        setStackCards(stackGen)
    }, [stack])

    console.log(show)

    return (
        <div className={styles.base}>

            <div className={styles.rows}>

                <div className={styles.topRow}>

                    {seats[2] && (
                        <div className={styles.opponentTable}>
                            {opponents[2] && <PlayerTable orientation="d" player={players[opponents[2]]}/>}
                        </div>
                    )}

                    {seats[3] && (
                        <div className={styles.opponentTable}>
                            {opponents[3] && <PlayerTable orientation="d" player={players[opponents[3]]}/>}
                        </div>
                    )}

                    {seats[4] && (
                        <div className={styles.opponentTable}>
                            {opponents[4] && <PlayerTable orientation="d" player={players[opponents[4]]}/>}
                        </div>
                    )}

                </div>

                <div className={styles.middleRow}>

                    <div className={styles.tableSide}>

                        {seats[1] && (
                            <div className={styles.opponentTable}>
                                Player {opponents[1]}
                            </div>
                        )}

                        {seats[0] && (
                            <div className={styles.opponentTable}>
                                Player {opponents[0]}
                            </div>
                        )}

                    </div>

                    <div className={styles.center}>

                        <div className={styles.table}>
                            
                        </div>

                        <div>
                            {show && <ActionButton text={text} onClick={action}/>}
                        </div>

                        <div className={styles.playerTable}>

                        </div>

                    </div>

                    <div className={styles.tableSide}>

                        {seats[5] && (
                            <div className={styles.opponentTable}>
                                Player {opponents[5]}
                            </div>
                        )}

                        {seats[6] && (
                            <div className={styles.opponentTable}>
                                Player {opponents[6]}
                            </div>
                        )}

                    </div>

                </div>

            </div>

            
        </div>
    )
}

export default Table