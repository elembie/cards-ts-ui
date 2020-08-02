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

    return (
        <div className={styles.base} onClick={() => handleClick(cards)}>
            {cards.map((c, i) => (
                <Card location='table' card={c} key={c.id}/>
            ))}
        </div>
    )
}

export default CardPile
