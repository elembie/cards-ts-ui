import React, { FunctionComponent, useState, useEffect } from 'react'
import getCard from './mapper'

interface Props {
    suit: string,
    value: number,
}

const Card: FunctionComponent<Props> = (props) => {

    const { suit, value } = props
    const [Card, setCard] = useState<React.FunctionComponent>()
    
    useEffect(() => { 
        setCard(getCard(suit, value))
    }, [suit, value])

    return (
        <div>
            {Card && <Card/>}
        </div>
    )
}

export default Card