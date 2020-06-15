import React, { FunctionComponent, useState } from 'react'
import { GameTypes } from '../../store/game/types'
import GameCard from '../GameCard'
import Button from '../Button'
import styles from './Forms.module.scss'


const NewGameForm: FunctionComponent = (props) => {

    // form values
    const [selectedGame, setSelectedGame] = useState<GameTypes | undefined>(undefined)
    const [isPrivate, setIsPrivate] = useState<boolean>(true)
    const [tableSize, setTableSize] = useState<number>(4)

    return (
        <div className={styles.base}>

            <div>SELECT A GAME:</div>

            <div className={styles.gamesContainer}>
                {Object.values(GameTypes).map(g => 
                    <GameCard gameType={g} onClick={setSelectedGame} isSelected={g === selectedGame}/>
                )}
            </div>

            {selectedGame && (
            <div className={styles.form}>

                <div>OPTIONS:</div>

                <div className={styles.privacyContainer}>
                    <button 
                        className={isPrivate ? styles.selected : ''}
                        onClick={()=> setIsPrivate(true)}
                    >
                        {'\u{1F512}'} PRIVATE
                    </button>

                    <button 
                        className={!isPrivate ? styles.selected : ''}
                        onClick={()=> setIsPrivate(false)}
                    >
                        PUBLIC
                    </button>
                </div>

                <div>
                    {isPrivate 
                        ? 'Only people with the game link can join'
                        : 'The game will be listed publically, anyone can join'
                    }
                </div>

                <div>Number of players: <span>-</span> {tableSize} <span>+</span></div>
                

            </div>
            )}
            
            
        </div>
    )
}

export default NewGameForm



