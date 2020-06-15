import React, { FunctionComponent } from 'react'
import styles from './Button.module.scss'
import Spinner from '../Spinner'

export interface Props {
    classname?: string,
    onClick?: () => void,
    text: string,
    isSubmitting?: boolean
}

const Button: FunctionComponent<Props> = (props) => {

    const {
        classname,
        text,
        onClick,
        isSubmitting,
    } = props

    return (
        <button 
            onClick={onClick}
            className={`${styles.base} ${classname}` }
        >
            {isSubmitting 
                ? <Spinner width={25}/>
                : text.toUpperCase()
            }
        </button>
    )
}

export default Button