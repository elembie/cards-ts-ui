import React, { FunctionComponent, useState } from 'react'
import { GameTypes } from '../../store/game/types'
import GameCard from '../GameCard'
import Button from '../Button'
import styles from './Forms.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { AppDispatch } from '../../store'
import { createGame } from '../../store/game/actions'


const NewGameForm: FunctionComponent = (props) => {

    // form values
    const [selectedGame, setSelectedGame] = useState<GameTypes | undefined>(undefined)
    const [isPrivate, setIsPrivate] = useState<boolean>(true)
    const [tableSize, setTableSize] = useState<number>(4)

    // redux
    const dispatch: AppDispatch = useDispatch()
    const isCreatingGame = useSelector((state: RootState) => state.game.isCreatingGame)

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

                <div className={styles.nplayersContainer}>
                    Number of players: 
                    <div className={styles.playerDown} onClick={()=> {if (tableSize > 2) {setTableSize(tableSize-1)}}}></div> 
                    <div className={styles.nPlayers}>{tableSize} </div>
                    <div className={styles.playerUp} onClick={()=> {if (tableSize < 8) {setTableSize(tableSize+1)}}}></div>
                </div>

                <Button 
                    isSubmitting={isCreatingGame} 
                    text='create game' 
                    classname={styles.createGameButton}
                    onClick={()=> dispatch(createGame({
                        gameType: selectedGame,
                        isPrivate: isPrivate,
                        tableSize: tableSize,
                    }))}
                />                

            </div>
            )}
            
            
        </div>
    )
}

export default NewGameForm



