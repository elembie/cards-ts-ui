import React, { FunctionComponent } from 'react'
import styles from './Table.module.scss'
import ActionButton from '../ActionButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { getActionButtonProps } from '../../games/logic'

const Table: FunctionComponent = () => {

    const { meta: { gameType }} = useSelector((state: RootState) => state.game)
    const {show, text, action} = getActionButtonProps(gameType)

    return (
        <div className={styles.base}>
            <div className={styles.table}>
                {show && <ActionButton text={text} onClick={action}/>}
            </div>
        </div>
    )
}

export default Table