import React, { FunctionComponent } from 'react'
import styles from './Spinner.module.scss'

export interface Props {
    width: number,
}

const Spinner: FunctionComponent<Props> = (props) => {

    const { width } = props

    const style = {
        width: `${width}px`,
        minWidth: `${width}px`,
        height: `${width}px`,
        minHeight: `${width}px`
    }

    return (
        <div className={styles.base} style={style}/>
    )
}

export default Spinner