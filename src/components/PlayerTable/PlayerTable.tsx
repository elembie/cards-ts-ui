import React, { FunctionComponent, useEffect, useState } from 'react'
import { ICard } from '../../games/types';
import styles from './PlayerTable.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { ShdPlayer } from '../../games/shd/types';
import Card from '../Card';

interface Props {
    orientation: 'u' | 'd' | 'l' | 'r',
    playerId: string | undefined,
}

const PlayerTable: FunctionComponent<Props> = (props) => {
    
    const { orientation, playerId } = props
    const player = useSelector((state: RootState) => state.game.players[playerId || ''])
    const gameType = useSelector((state: RootState) => state.game.meta.gameType)

    const [hidden, setHidden] = useState<ICard[]>()

    // TODO put into game specific Player table
    const gamePlayer = player as ShdPlayer
    const hiddenCount = gamePlayer?.hidden || 0

    useEffect(() => {
        if(hiddenCount) {
            setHidden(Array
                .from(Array(hiddenCount).keys())
                .map(i => ({
                    id: `hidden-${i}`,
                    rank: 0,
                    suit: 'S',
                    value: 0,
                })))
        }
    }, [hiddenCount])

    if (player === undefined) {
        return null
    }

    console.log(hidden)

    return (
        <div className={`${styles.base} ${styles[orientation]}`}>
            {gamePlayer.table.map(c => 
                <Card 
                    suit={c.suit} 
                    value={c.value} 
                    key={c.id}
                    location='table'
                />)}
        </div>
    )
}

export default PlayerTable