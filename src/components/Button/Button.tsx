import React, { FunctionComponent } from 'react'
import styles from './Button.module.scss'

export interface Props {
    classname?: string,
    onClick?: () => void,
    text: string,
}

const Button: FunctionComponent<Props> = (props) => {

    const {
        classname,
        text,
        onClick
    } = props

    return (
        <button 
            onClick={onClick}
            className={`${styles.base} ${classname}` }
        >
            {text.toUpperCase()}
        </button>
    )
}

export default Button