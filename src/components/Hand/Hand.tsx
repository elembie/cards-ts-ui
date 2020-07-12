import React, { FunctionComponent } from 'react'
import { ICard } from '../../games/types';
import styles from './Hand.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Card from '../Card';

interface Props {
    cards: ICard[]
}

const Hand: FunctionComponent<Props> = (props) => {

    const { player } = useSelector((state: RootState) => state.game)
    const hand = typeof player.hand === 'number' || player.hand === undefined ? [] : player.hand 
    console.log(hand)

    return (
        <div className={styles.base}>
            <div className={styles.hand}>
                <div className={styles.cardContainer}>
                    { hand.map(c => <Card value={c.value} suit={c.suit}/>) }
                </div>
            </div>
        </div>
    )
}

export default Hand