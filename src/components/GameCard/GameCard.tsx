import React, { FunctionComponent } from 'react'
import { GameTypes } from 'store/game/types';
import styles from './GameCard.module.scss'

export interface Props {
    gameType: GameTypes
    onClick?: (game: GameTypes) => any,
    isSelected: boolean,
}

const gamesMap: { [key in GameTypes]: { text: string, emoji: React.ReactNode } } = {
    [GameTypes.Shithead]: {
        text: 'SHITHEAD',
        emoji: (<span>{'\u{1F4A9}'}</span>)
    },
    [GameTypes.ChaseTheQueen]: {
        text: 'CHASE THE QUEEN',
        emoji: (<span>{'\u{1F478}'}</span>)
    },
}

const GameCard: FunctionComponent<Props> = (props) => {
    
    const { gameType, isSelected, onClick } = props

    const game = gamesMap[gameType] 
    const baseStyle = isSelected 
        ? `${styles.base} ${styles.selected}`
        : styles.base 

    return (
        <div className={baseStyle} onClick={() => onClick ? onClick(gameType) : ()=>{}}>
            <div className={styles.emoji}>{game.emoji}</div>
            <div className={styles.name}>{game.text}</div>
        </div>
    )
}

export default GameCard