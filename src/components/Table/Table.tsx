import React, { FunctionComponent } from 'react'
import styles from './Table.module.scss'
import ActionButton from '../ActionButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'

const Table: FunctionComponent = () => {

    const { meta: { id }} = useSelector((state: RootState) => state.game)

    return (
        <div className={styles.base}>
            <div className={styles.table}>
                <ActionButton gameId={id}/>
            </div>
        </div>
    )
}

export default Table