import React, { FunctionComponent } from 'react'
import styles from './ActionButton.module.scss'
import { handleActionButton } from '../../games/logic'
import { GameTypes } from '../../store/game/types'

interface Props {
    text: string,
    onClick: () => void
}

const ActionButton: FunctionComponent<Props> = (props) => {
    const { text, onClick } = props
    return (
        <div className={styles.base} onClick={onClick}>
            {text}
        </div>
    )
}

export default ActionButton