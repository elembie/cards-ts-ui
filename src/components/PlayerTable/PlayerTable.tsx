import React, { FunctionComponent, useState, useEffect } from 'react'
import styles from './PlayerTable.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { ShdPlayer, ShdStatues, ShdActions, ShdCard } from '../../games/shd/types';
import CardPile from '../CardPile';
import { ICard } from '../../games/types';
import { GameMessage } from '../../store/game/types';
import { AppDispatch } from '../../store';
import { sendMessage, removeHandCard } from '../../store/game/actions';

interface Props {
    orientation: 'u' | 'd' | 'l' | 'r',
    playerId: string | undefined,
}

const PlayerTable: FunctionComponent<Props> = (props) => {
    
    const { orientation, playerId } = props

    const dispatch = useDispatch<AppDispatch>()
    const { selectedCards, state: { status }, player: { hand } } = useSelector((state: RootState) => state.game )
    const player = useSelector((state: RootState) => state.game.players[playerId || ''])
    const gameType = useSelector((state: RootState) => state.game.meta.gameType)

    const [table, setTable] = useState<(ICard)[]>([{} as ICard, {} as ICard, {} as ICard])
    const [hidden, setHidden] = useState<(ICard)[]>([{} as ICard, {} as ICard, {} as ICard])

    // TODO put into game specific Player table
    const gamePlayer = player as ShdPlayer
    const playerHand = typeof hand === 'number' ? [] : hand as ShdCard[]
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
                if (selectedCards.length === 1) {
                    console.log('PLAYERHAND',playerHand)
                    const handCard = playerHand.find(c => c.id === selectedCards[0]) || {} as ShdCard
                    console.log('HAND CARD',handCard)
                    handCard.order = (cards[0] as ShdCard).order
                    setTable([
                        ...table.filter(c => c.id !== cards[0].id),
                        handCard,
                    ])
                    dispatch(removeHandCard(selectedCards[0]))
                    dispatch(sendMessage({
                        type: ShdActions.SWAP,
                        data: {
                            hand: selectedCards[0],
                            table: cards[0].id
                        },
                    }))
                }
                break
            default:
                return
        }
    }

    return (
        <div className={`${styles.base} ${styles[orientation]}`}>
            {piles.map(p => <CardPile cards={p} offset={1} onClick={orientation === 'u' ? handleClick : () => {}}/>)}
        </div>
    )
}

export default PlayerTable