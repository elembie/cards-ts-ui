import React, { FunctionComponent } from 'react'
import { ICard } from 'games/types';
import styles from './TableHistory.module.scss'

interface Props {
    cards: ICard[]
}

type suits = 'C' | 'D' | 'H' | 'S'

const mapSuit = (suit: suits): string => {
    switch (suit) {
        case 'C': return '♣'
        case 'D': return '♦'
        case 'H': return '♥'
        case 'S': return '♠'
        default: return ''
    }
}

const isRed = (suit: suits): boolean => {
    switch (suit) {
        case 'C': return false
        case 'D': return true
        case 'H': return true
        case 'S': return false
        default: return false
    }
}

const TableHistory: FunctionComponent<Props> = (props) => {
    
    const { cards } = props
    
    if (!cards || cards.length === 0) { return null }
    
    const start = cards.length > 5 ? 5 : cards.length
    const history = cards.slice(cards.length - start, cards.length).reverse()

    return (
        <div className={styles.base}>
            {history.map((c, i) => (
                <div key={c.id} style={{opacity: 1-(i*20)/100}} className={`${styles.item} ${isRed(c.suit) ? styles.red : styles.black}`}>
                    <div>{c.rank}</div>
                    <div>{mapSuit(c.suit)}</div>
                </div>
            ))}
        </div>
    )
}

export default TableHistory