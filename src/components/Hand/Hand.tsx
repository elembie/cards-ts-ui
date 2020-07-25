import React, { FunctionComponent, useCallback } from 'react'
import { ICard } from '../../games/types';
import styles from './Hand.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Card from '../Card';
import { selectCard } from '../../games/logic';

interface Props {
    cards: ICard[]
}

const Hand: FunctionComponent<Props> = (props) => {

    const { player, meta: { gameType } } = useSelector((state: RootState) => state.game)

    const hand = typeof player.hand === 'number' || player.hand === undefined 
        ? [] 
        : player.hand.sort((a, b) => a.value - b.value)

    const width = 0.6 * 200 * hand.length

    const handleClick = useCallback((cardId: string) => {
        console.log('CLICKED:', cardId)
        selectCard(cardId, gameType)
    }, [gameType])

    return (
        <div className={styles.base}>
            <div className={styles.hand}>
                <div className={styles.cards} style={{width: `${width}px`}}>
                    { hand.map((c, i) => {
                        const offset = -i * 200 + i * 60 - 50
                        return (
                            <div style={{transform: `translateX(${offset}px)`}}>
                                <Card card={c} location='hand' onClick={handleClick}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Hand