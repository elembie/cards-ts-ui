import React, { FunctionComponent } from 'react'
import { ICard } from '../../games/types';
import Card from '../Card';
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
            <div className={styles.pile} style={{top: `-${i*12}vh`, zIndex: -10*i, left: -i*3}} key={c.id}>
                <Card location='table' card={c} key={c.id}/>
            </div>
            ))}
        </div>
    )
}

export default CardPile
