import React, { FunctionComponent, useState, useEffect } from 'react'
import getCard from './mapper'
import styles from './Card.module.scss'
import { ICard } from '../../games/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'

interface Props {
    card: ICard,
    style?: object,
    location: 'hand' | 'table' | 'played'
    onClick?: (cardId: string) => void
}

const Card: FunctionComponent<Props> = (props) => {

    const { card, style, location, onClick } = props
    const [Card, setCard] = useState<React.FunctionComponent>()

    const selectedCards = useSelector((state: RootState) => state.game.selectedCards)
    const isSelected = selectedCards.indexOf(card.id) >= 0

    const handleClick = onClick ? onClick : () => {}
    
    useEffect(() => { 
        setCard(getCard(card.suit, card.value))
    }, [card.suit, card.value])

    return (
        <div className={`${styles.base} ${styles[location]} ${isSelected ? styles.selected : ''}`} style={style} onClick={() => handleClick(card.id)}>
            {Card && <Card/>}
        </div>
    )
}

export default Card