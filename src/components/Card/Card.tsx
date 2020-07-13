import React, { FunctionComponent, useState, useEffect } from 'react'
import getCard from './mapper'
import styles from './Card.module.scss'

interface Props {
    suit: string,
    value: number,
    style?: object,
}

const Card: FunctionComponent<Props> = (props) => {

    const { suit, value, style } = props
    const [Card, setCard] = useState<React.FunctionComponent>()
    
    useEffect(() => { 
        setCard(getCard(suit, value))
    }, [suit, value])

    return (
        <div className={styles.base} style={style}>
            {Card && <Card/>}
        </div>
    )
}

export default Card