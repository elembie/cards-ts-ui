import React, { FunctionComponent, useEffect } from 'react'
import styles from './PlayerCard.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { AppDispatch } from 'store'
import { getPlayer } from 'store/game/actions'
import { getPlayerStatusString } from 'games/logic'
import { ReactComponent as CardBack } from './../../static/cards/back.svg'
import Card from 'components/Card'
import { ICard } from 'games/types'
import { ShdPlayer } from 'games/shd/types'

export interface Props {
    playerId: string
}

const rotationDeg = 10

const PlayerCard: FunctionComponent<Props> = (props) => {

    const { playerId } = props
    const dispatch = useDispatch<AppDispatch>()

    const gameType = useSelector((state: RootState) => state.game.meta.gameType)
    const opponent = useSelector((state: RootState) => state.game.opponents[playerId])
    const player = useSelector((state: RootState) => state.game.players[playerId])
    const statusString = playerId ? getPlayerStatusString(playerId, gameType) : ''

    const fetchPlayer = playerId.length > 0 && !opponent

    useEffect(() => {
        if (fetchPlayer) {
            dispatch(getPlayer(playerId))
        }
    }, [dispatch, fetchPlayer, playerId])

    const shdPlayer = player as ShdPlayer

    const handLength = typeof(shdPlayer?.hand) === 'number'
        ? shdPlayer?.hand || 0
        : shdPlayer?.hand.length || 0

    const cardsToShow = handLength > 3 ? 3 : handLength
    const handMap: number[] = []
    const blankCard = {} as ICard

    for (var i=0; i<cardsToShow; i++) {
        handMap.push(i)
    }

    const getRotation = (map: number[], idx: number): number => {
        switch (map.length) {
            case 3: return (idx -1) * rotationDeg 
            case 2: return (idx === 0 ? -1 : 1) * rotationDeg
            case 1: return 0
            default: return 0
        }
    }

    return (
        <div className={`${styles.base} ${player && player.isActive ? styles.active : ''}`}>
            {opponent && opponent.isFetched

                ? (
                    <div className={styles.container}>
                        <p className={styles.name}>{opponent.name}</p>
                        <p className={styles.status}>{statusString}</p>

                        {handMap.map(i => (
                            <div className={styles.card} style={{transform: `rotate(${getRotation(handMap, i)}deg)`}}>
                                <Card key={i} card={{...blankCard, id: 'back'}} location='mini'/>
                            </div>))}

                        {cardsToShow >= 3 && <div className={styles.handSize}>{handLength}</div>}
                    </div>

                ) : (

                    <div>
                        Waiting for player
                    </div>
                )}
        </div>
    )
    
}

export default PlayerCard

