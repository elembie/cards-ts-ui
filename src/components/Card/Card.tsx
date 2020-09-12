import React, { FunctionComponent, useState, useEffect } from 'react'
import getCard from './mapper'
import styles from './Card.module.scss'
import { ICard } from 'games/types'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

interface Props {
    card: ICard,
    style?: object,
    selectable?: boolean,
    location: 'hand' | 'table' | 'played' | 'mini'
    onClick?: (cardId: string) => void
}

const Card: FunctionComponent<Props> = (props) => {

    const { card, style, location, onClick } = props

    const selectedCards = useSelector((state: RootState) => state.game.selectedCards)
    const isSelected = selectedCards.indexOf(card.id) >= 0

    const handleClick = onClick ? onClick : () => {}

    const Card = getCard(card.id, card.suit, card.value)

    return (
        <div 
            className={`${styles.base} ${styles[location]} ${isSelected ? styles.selected : ''}`} 
            style={style} 
            onClick={() => handleClick(card.id)}
        >
            {Card !== undefined && <Card/>}
        </div>
    )
}

export default Card