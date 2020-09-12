import React, { FunctionComponent, useState, useEffect } from 'react'
import styles from './PlayerTable.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { ShdPlayer, ShdStatues, ShdActions } from 'games/shd/types';
import CardPile from 'components/CardPile';
import { ICard, IPlayer } from 'games/types';
import { AppDispatch } from 'store';
import { sendMessage, shdSwapTable, selectCards } from 'store/game/actions';
import { selectCard } from 'games/logic';

interface Props {
    orientation: 'u' | 'd' | 'l' | 'r',
    player: IPlayer,
}

const PlayerTable: FunctionComponent<Props> = (props) => {
    
    const { orientation, player } = props

    const dispatch = useDispatch<AppDispatch>()
    const { selectedCards, state: { status } } = useSelector((state: RootState) => state.game )
    const gameType = useSelector((state: RootState) => state.game.meta.gameType)

    // TODO put into game specific Player table
    const gamePlayer = player as ShdPlayer
    const playerTable = gamePlayer?.table || []
    const playerHidden = gamePlayer?.hidden || []
    const playerHand = typeof(gamePlayer?.hand) === 'number' ? [] : gamePlayer?.hand || []

    const table = [0,1,2].map(i => playerTable.find(c => c.order === i) || {} as ICard)
    const hidden = [0,1,2].map(i => playerHidden.find(c => c.order === i) || {} as ICard)

    const piles = [
        [hidden[0], table[0]],
        [hidden[1], table[1]],
        [hidden[2], table[2]],
    ]

    if (!player) {
        return null
    }

    const handleClick = (cards: ICard[]) => {
        console.log('Handling card pile click', cards)
        switch (status) {
            case ShdStatues.PREP:
                if (selectedCards.length === 1 && !gamePlayer.isReady) {
                    const swap = {
                        hand: selectedCards[0],
                        table: cards.reverse()[0].id
                    }
                    dispatch(shdSwapTable(swap))
                    dispatch(sendMessage({
                        type: ShdActions.SWAP,
                        data: swap,
                    }))
                }
                break
            case ShdStatues.PLAYING:
                if (playerHand.length === 0) {
                    if (playerTable.length === 0 && playerHidden.length !== 0) {
                        selectCard(cards[0].id, gameType)
                    } else {
                        selectCard(cards.reverse()[0].id, gameType)
                    }
                }
                break
            default:
                return
        }
    }

    return (
        <div className={`${styles.base} ${styles[orientation]}`}>
            {piles.map((p, i) => 
                <div className={styles.pileContainer} key={`${i}-${p.map(c => c.id).join('-')}`}>
                    {<CardPile cards={p} offset={3} onClick={orientation === 'u' ? () => handleClick(p) : () => {}}/>}
                </div>
            )}
        </div>
    )
}

export default PlayerTable