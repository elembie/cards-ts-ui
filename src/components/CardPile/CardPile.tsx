import React, { FunctionComponent } from 'react'
import { ICard } from '../../games/types';
import Card from '../Card';
import styles from './CardPile.module.scss'

interface Props {
    cards: ICard[]
    offset: number
}

const CardPile: FunctionComponent<Props> = (props) => {
    
    const { cards, offset } = props

    return (
        <div className={styles.base}>
            {cards.map((c, i) => (
            <div className={styles.pile} style={{top: `-${i*12}vh`, zIndex: -10*i, left: -i*3}}>
                <Card location='table' suit={c.suit} value={c.value} key={c.id}/>
            </div>
            ))}
        </div>
    )
}

export default CardPile
