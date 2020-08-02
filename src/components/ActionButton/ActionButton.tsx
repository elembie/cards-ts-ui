import React, { FunctionComponent } from 'react'
import styles from './ActionButton.module.scss'

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