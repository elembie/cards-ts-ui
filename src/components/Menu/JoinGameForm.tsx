import React, { FunctionComponent, useState } from 'react'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'store'
import { joinGame } from 'store/game/actions'
import { RootState } from 'store/rootReducer'

const JoinGameForm: FunctionComponent = () => {

    const [ gameIdInput, setGameIdInput ] = useState<string|undefined>(undefined)
    const dispatch = useDispatch<AppDispatch>()
    const { isJoiningGame } = useSelector((state: RootState) => state.game)

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <input 
                type='text' 
                placeholder='game id' 
                id='join-game-input' 
                value={gameIdInput} 
                onChange={(e)=> setGameIdInput(e.target.value)}
            />
        
        <Button 
            text='JOIN GAME' 
            isSubmitting={isJoiningGame}
            onClick={()=>{
                if (gameIdInput && gameIdInput.length > 0) {
                    dispatch(joinGame(gameIdInput))
                }
            }}
        />
        </div>
    )
}

export default JoinGameForm