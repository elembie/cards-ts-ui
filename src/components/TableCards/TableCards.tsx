import React, { FunctionComponent } from 'react'
import { ICard } from 'games/types';
import styles from './TableCards.module.scss'
import Card from 'components/Card';

interface Props {
    cards: ICard[]
}

const TableCards: FunctionComponent<Props> = (props) => {
    
    const { cards } = props
    
    return (
        <div className={styles.base}>
            {cards.map(c => (
                <div>
                    <Card card={c} location="table"/>
                </div>
            ))}
        </div>
    )
}

export default TableCards