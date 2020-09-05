import React, { FunctionComponent } from 'react'
import { ICard } from 'games/types';
import styles from './Hand.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import Card from 'components/Card';
import { selectCard } from 'games/logic';

interface Props {
    cards: ICard[]
}

const Hand: FunctionComponent<Props> = (props) => {

    const { player, meta: { gameType } } = useSelector((state: RootState) => state.game)

    const hand = typeof player.hand === 'number' || player.hand === undefined 
        ? [] 
        : player.hand.sort((a, b) => a.value - b.value)

    const width = 0.6 * 200 * hand.length

    const handleClick = (cardId: string) => {
        selectCard(cardId, gameType)
    }

    return (
        <div className={styles.base}>
            <div className={styles.hand}>
                <div className={styles.cards} style={{width: `${width}px`}}>
                    { hand.map((c, i) => {
                        const offset = -i * 200 + i * 60 - 100
                        return (
                            <div style={{transform: `translateX(${offset}px)`}} key={c.id}>
                                <Card card={c} location='hand' onClick={handleClick} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.overlay}>
                Hi
            </div>
        </div>
    )
}

export default Hand