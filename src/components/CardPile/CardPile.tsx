import React, { FunctionComponent } from 'react'
import { ICard } from '../../games/types';
import Card from '../Card';

interface Props {
    cards: ICard[]
    offset: number
}

const CardPile: FunctionComponent<Props> = (props) => {
    
    const { cards, offset } = props

    return (
        <div>
            {cards.map(c => <Card location='table' suit={c.suit} value={c.value} key={c.id}/>)}
        </div>
    )
}

export default CardPile
