import React, { FunctionComponent } from 'react'
import Constants from '../../config/constants'
import styles from './Loading.module.scss'

export interface Props {
    dark: boolean
}

const Loading: FunctionComponent<Props> = (props) => {

    return (
        <div className={styles.base}>
            <div className={styles.suits}>{Constants.suits.map(s => <div style={{color: s.color}}>{s.icon}</div>)}</div>
            <div>loading...</div>
            <div className={styles.suits}>{Constants.suits.reverse().map(s => <div style={{color: s.color}}>{s.icon}</div>)}</div>
        </div>
        
    )
}

export default Loading