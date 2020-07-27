import React, { FunctionComponent, useState, useEffect } from 'react'
import styles from './PlayerTable.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { ShdPlayer, ShdStatues, ShdActions, ShdCard } from '../../games/shd/types';
import CardPile from '../CardPile';
import { ICard, IPlayer } from '../../games/types';
import { GameMessage } from '../../store/game/types';
import { AppDispatch } from '../../store';
import { sendMessage, removeHandCard, shdSwapTable } from '../../store/game/actions';

interface Props {
    orientation: 'u' | 'd' | 'l' | 'r',
    player: IPlayer,
}

const PlayerTable: FunctionComponent<Props> = (props) => {
    
    const { orientation, player } = props

    const dispatch = useDispatch<AppDispatch>()
    const { selectedCards, state: { status } } = useSelector((state: RootState) => state.game )
    const gameType = useSelector((state: RootState) => state.game.meta.gameType)

    const [table, setTable] = useState<(ICard)[]>([{} as ICard, {} as ICard, {} as ICard])
    const [hidden, setHidden] = useState<(ICard)[]>([{} as ICard, {} as ICard, {} as ICard])

    // TODO put into game specific Player table
    const gamePlayer = player as ShdPlayer
    const playerTable = gamePlayer?.table || []
    const playerHidden = gamePlayer?.hidden || []

    useEffect(() => {
        setTable([0,1,2].map(i => playerTable.find(c => c.order === i) || {} as ICard))
    }, [playerTable])

    useEffect(() => {
        setHidden([0,1,2].map(i => playerHidden.find(c => c.order === i) || {} as ICard))
    }, [playerHidden])

    const piles = [
        [table[0], hidden[0]],
        [table[1], hidden[1]],
        [table[2], hidden[2]],
    ]

    if (!player) {
        return null
    }

    const handleClick = (cards: ICard[]) => {
        switch (status) {
            case ShdStatues.PREP:
                if (selectedCards.length === 1 && !gamePlayer.isReady) {
                    const swap = {
                        hand: selectedCards[0],
                        table: cards[0].id
                    }
                    dispatch(shdSwapTable(swap))
                    dispatch(sendMessage({
                        type: ShdActions.SWAP,
                        data: swap,
                    }))
                }
                break
            default:
                return
        }
    }

    return (
        <div className={`${styles.base} ${styles[orientation]}`}>
            {piles.map(p => <CardPile cards={p} offset={3} onClick={orientation === 'u' ? handleClick : () => {}}/>)}
        </div>
    )
}

export default PlayerTable