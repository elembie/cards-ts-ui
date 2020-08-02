import React, { FunctionComponent } from 'react'
import Constants from 'config/constants'
import styles from './Loading.module.scss'
import Modal from 'components/Modal'

export interface Props {
    dark: boolean
}

const Loading: FunctionComponent<Props> = (props) => {

    return (
        <Modal isOpen>
            <div className={styles.base}>
                <div className={styles.loading}>
                    <div className={styles.suits}>{Constants.suits.map(s => <div style={{color: s.color}}>{s.icon}</div>)}</div>
                    <div>loading...</div>
                    <div className={styles.suits}>{Constants.suits.reverse().map(s => <div style={{color: s.color}}>{s.icon}</div>)}</div>
                </div>
            </div>
        </Modal>
    )
}

export default Loading