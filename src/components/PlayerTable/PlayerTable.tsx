import React, { FunctionComponent, useEffect, useState } from 'react'
import { ICard } from '../../games/types';
import styles from './PlayerTable.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { ShdPlayer } from '../../games/shd/types';
import Card from '../Card';
import CardPile from '../CardPile';

interface Props {
    orientation: 'u' | 'd' | 'l' | 'r',
    playerId: string | undefined,
}

const PlayerTable: FunctionComponent<Props> = (props) => {
    
    const { orientation, playerId } = props
    const player = useSelector((state: RootState) => state.game.players[playerId || ''])
    const gameType = useSelector((state: RootState) => state.game.meta.gameType)

    if (!player) {
        return null
    }

    // TODO put into game specific Player table
    const gamePlayer = player as ShdPlayer
    const table = gamePlayer.table.sort((a,b) => a.order - b.order) || []
    const hidden = gamePlayer.hidden.sort((a,b) => a.order - b.order) || []

    const piles = table.map((t, i) => [t, hidden[i]])

    console.log(piles)

    return (
        <div className={`${styles.base} ${styles[orientation]}`}>
            {piles.map(p => <CardPile cards={p} offset={1}/>)}
        </div>
    )
}

export default PlayerTable