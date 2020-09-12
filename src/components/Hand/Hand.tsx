import React, { FunctionComponent } from 'react'
import { ICard } from 'games/types';
import styles from './Hand.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import Card from 'components/Card';
import { selectCard, getPlayerStatusString } from 'games/logic';

interface Props {
    cards: ICard[]
}

const Hand: FunctionComponent<Props> = (props) => {

    const { player, meta: { gameType } } = useSelector((state: RootState) => state.game)
    const playerName = useSelector((state: RootState) => state.session.user.name) || ''
    const statusString = getPlayerStatusString(player.id, gameType)

    const hand = typeof player.hand === 'number' || player.hand === undefined 
        ? [] 
        : player.hand.sort((a, b) => a.value - b.value)

    const dynamicWidth = 0.6 * 200 * hand.length
    const width = dynamicWidth <= 1200 ? dynamicWidth : 1200
    const overlap = (width - 200)/hand.length

    return (
        <div className={styles.base}>
            <div className={styles.hand} style={{width: `${width}px`}}>
                <div className={styles.cards}>
                    { hand.map((c, i) => {
                        const offset = -i * 200 + i * overlap + overlap
                        return (
                            <div style={{transform: `translateX(${offset}px)`}} key={c.id}>
                                <Card card={c} location='hand' onClick={() => selectCard(c.id, gameType)} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={`${styles.overlay} ${player.isActive ? styles.active : ''}`}>
                <div>
                    <span className={styles.name}>{playerName}</span>
                    {statusString.length > 0 && <span className={styles.status}>&nbsp;{`| ${statusString}`}</span>}
                </div>
                
            </div>
        </div>
    )
}

export default Hand