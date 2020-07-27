import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from './Table.module.scss'
import ActionButton from '../ActionButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { getActionButtonProps } from '../../games/logic'
import { ICard } from '../../games/types'
import CardPile from '../CardPile'

const Table: FunctionComponent = () => {

    const { meta: { gameType }, state: { stack }} = useSelector((state: RootState) => state.game)
    const { show, text, action } = getActionButtonProps(gameType)

    const [ stackCards, setStackCards ] = useState<ICard[]>([])

    useEffect(() => {
        const stackGen: ICard[] = []
        const max = stack > 10 ? 10 : stack
        for (var i=0; i<max; i++) {
            stackGen.push({} as ICard)
        }
        setStackCards(stackGen)
    }, [stack])

    return (
        <div className={styles.base}>
            <div className={styles.table}>
                <div className={styles.container}>
                    <div className={styles.hints}>
                        
                    </div>
                    <div className={styles.played}>
                        
                    </div>
                    <div className={styles.stack}>
                        <CardPile cards={stackCards} offset={0.3} />
                    </div>
                    
                </div>
                {show && <ActionButton text={text} onClick={action}/>}
                
            </div>
        </div>
    )
}

export default Table