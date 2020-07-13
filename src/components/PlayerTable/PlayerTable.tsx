import React, { FunctionComponent } from 'react'
import { ICard } from '../../games/types';
import styles from './PlayerTable.module.scss'

interface Props {
    orientation: 'u' | 'd' | 'l' | 'r'
    slots: number
    piles: ICard[][]
}

const PlayerTable: FunctionComponent<Props> = (props) => {
    const { orientation } = props
    return (
        <div className={`${styles.base} ${styles[orientation]}`}>
            Player table
        </div>
    )
}

export default PlayerTable