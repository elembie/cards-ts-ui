import React, { FunctionComponent } from 'react'
import styles from './ActionButton.module.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { sendMessage } from '../../store/game/actions'
import { GameMessage, GameTypes } from '../../store/game/types'
import { ShdActions } from '../../games/shd/types'

interface Props {
    gameId: string,
}

const ActionButton: FunctionComponent<Props> = (props) => {

    const dispatch = useDispatch<AppDispatch>()
    const { gameId } = props

    const handleClick = () => {
        const message: GameMessage = {
            type: ShdActions.DEAL,
            data: {},
        }
        dispatch(sendMessage(message))
    }

    return (
        <div className={styles.base} onClick={handleClick}>
            Deal
        </div>
    )
}

export default ActionButton