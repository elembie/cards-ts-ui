import React, { FunctionComponent } from 'react'
import { ICard } from 'games/types';
import Card from 'components/Card';
import styles from './CardPile.module.scss'

interface Props {
    cards: ICard[]
    offset: number,
    onClick?: (cards: ICard[]) => void
}

const CardPile: FunctionComponent<Props> = (props) => {
    
    const { cards, offset, onClick } = props

    const handleClick = onClick ? onClick : () => {}

    if (cards.length === 0) {
        return null
    }

    return (
        <div className={styles.base} onClick={() => handleClick(cards)}>
            {cards.map((c, i) => (
                <div className={styles.card} key={c.id} style={{left: `-${i}px`}}>
                    <Card location='table' card={c} />
                </div>
                
            ))}
        </div>
    )
}

export default CardPile
