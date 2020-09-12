import React, { FunctionComponent } from 'react'
import { ICard } from 'games/types';
import styles from './TableCards.module.scss'
import Card from 'components/Card';

interface Props {
    cards: ICard[]
}

const TableCards: FunctionComponent<Props> = (props) => {
    
    const { cards } = props

    if (cards === undefined) {
        return null
    }

    const transforms: string[] = cards.map(c => `rotate(${c.rotation}deg) translate(${c.xOffset}px, ${c.yOffset}px)`)
    
    return (
        <div className={styles.base}>
            {cards.map((c, i) => (
                <div 
                    className={styles.card} 
                    style={{transform: transforms[i]}
                }>
                    <Card card={c} location="table"/>
                </div>
            ))}
        </div>
    )
}

export default TableCards