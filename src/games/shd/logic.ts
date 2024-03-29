import { 
    ApiShdCard, 
    ShdCard,
    ApiShdPlayer,
    ShdPlayer,
    ApiShdState,
    ShdState,
    ShdStatues,
    isShdState,
    isShdPlayer,
    ShdActions,
} from './types'
import store from '../../store'
import { clearSelectedCards, selectCards, unselectCards, sendMessage } from '../../store/game/actions'
import { GameTypes } from '../../store/game/types'
import { ICard } from 'games/types'

export const mapShdApiCard = (card: ApiShdCard): ShdCard => {
    return {
        isHidden: card.is_hidden,
        isSpecial: card.is_special,
        playedBy: card.played_by,
        id: card.id,
        rank: card.rank,
        suit: card.suit,
        value: card.value,
        order: card.order,
        rotation: card.rotation,
        xOffset: card.x_offset,
        yOffset: card.y_offset,
    }
}

export const mapShdApiPlayer = (player: ApiShdPlayer): ShdPlayer => {

    return {
        canBurn: player.can_burn,
        canPlay: player.can_play,
        isActive: player.is_active,
        isDealer: player.is_dealer,
        isOut: player.is_out,
        isSh: player.is_sh,
        isReady: player.is_ready,
        shCount: player.sh_count,
        id: player.id,
        hand: typeof player.hand == 'number' ? player.hand : player.hand?.map(c => mapShdApiCard(c)),
        table: player.table.map(c => mapShdApiCard(c)),
        hidden: player.hidden.map(c => mapShdApiCard(c)),
        order: player.order,

    }
}

export const mapShdApiState = (state: ApiShdState): ShdState => {
    return {
        gameType: GameTypes.Shithead, 
        dead: state.dead,
        stack: state.stack,
        status: state.status,
        table: state.table.map(c => mapShdApiCard(c)),
        players: state.players.map(p => mapShdApiPlayer(p)),
        currentValue: state.current_value,
        totalPlayers: state.total_players,
    }
}

export const shdToggleCard = (cardId: string) => {
    const { player, selectedCards, state: { status } } = store.getState().game
    const isSelected = selectedCards.indexOf(cardId) >= 0

    if (isSelected) {
        store.dispatch(unselectCards([cardId]))
        return
    }

    const { hand } = player
    const playerHand: ICard[] = typeof(hand) !== 'number' 
        ? hand
        : []


    if (status === ShdStatues.PLAYING && playerHand.length === 0) {

        const shdPlayer = player as ShdPlayer

        if (shdPlayer.table.length > 0) {

            const card = shdPlayer.table.find(c => c.id === cardId)
            const selected = shdPlayer.table.filter(c => selectedCards.includes(c.id))
            const currentValue = selected.length > 0 ? selected[0].value : -1

            if (!card)  { return }

            if (selectedCards.length === 0) {
                store.dispatch(selectCards([cardId]))
            } else if (card.value === currentValue) {
                store.dispatch(selectCards([cardId]))
            } else {
                store.dispatch(clearSelectedCards())
                store.dispatch(selectCards([cardId]))
            }

        } else {

            const card = shdPlayer.hidden.find(c => c.id === cardId)
            if (!card)  { return }

            if (selectedCards.length > 0) {
                store.dispatch(clearSelectedCards())
            }

            store.dispatch(selectCards([cardId]))

        }

    } else {

        const selected = playerHand.filter(c => selectedCards.includes(c.id))
        const currentValue = selected.length > 0 ? selected[0].value : -1

        const card = playerHand.find(c => c.id === cardId)

        if (!card)  { return }

        if (status === ShdStatues.PREP) {

            if (selectedCards.length > 0) {
                store.dispatch(clearSelectedCards())
            }
            store.dispatch(selectCards([cardId]))

        } else if (status === ShdStatues.PLAYING) {

            if (selectedCards.length === 0) {
                store.dispatch(selectCards([cardId]))

            } else if (card.value === currentValue) {
                store.dispatch(selectCards([cardId]))
            } else {
                store.dispatch(clearSelectedCards())
                store.dispatch(selectCards([cardId]))
            }

        }

    }
}

export const shdGetActionButtonProps = (): {show: boolean, text: string, action: () => void} => {
    const { state, meta, player, selectedCards } = store.getState().game
    const userId = store.getState().session.user.id

    if (meta.tableSize === meta.playersJoined && !state.status && meta.createdBy === userId) {
        return {
            show: true,
            text: 'DEAL',
            action: () => store.dispatch(sendMessage({
                type: ShdActions.DEAL,
                data: {},
            }))
        }
    }
    
    if (!isShdState(state) || !isShdPlayer(player)) {
        return {show: false, text: '', action: () => {}}
    }

    switch (state.status) {

        case ShdStatues.INIT:

            if (player.isDealer) {
                return {
                    show: true,
                    text: 'DEAL',
                    action: () => store.dispatch(sendMessage({
                        type: ShdActions.DEAL,
                        data: {},
                    }))
                }
            }
            break

        case ShdStatues.PREP:

            if (!player.isReady) {
                return {
                    show: true, 
                    text: 'READY!', 
                    action: () => store.dispatch(sendMessage({
                        type: ShdActions.READY,
                        data: {}
                    }))
                }
            }
            break

        case ShdStatues.PLAYING:

            if (!player.isActive) {
                break
            }

            if (player.canBurn) {

                return {
                    show: true,
                    text: 'BURN PILE',
                    action: () => store.dispatch(sendMessage({
                        type: ShdActions.BURN,
                        data: {},
                    }))
                }

            } else if (!player.canPlay) {

                return {
                    show: true,
                    text: 'PICK UP :(',
                    action: () => store.dispatch(sendMessage({
                        type: ShdActions.PICKUP,
                        data: {},
                    }))
                }

            } else if (selectedCards.length > 0) {
                return {
                    show: true, 
                    text: 'PLAY CARDS', 
                    action: () => {
                        store.dispatch(sendMessage({
                            type: ShdActions.PLAY,
                            data: {
                                cardIds: selectedCards,
                            }
                        }))
                        store.dispatch(clearSelectedCards())
                    }
                }
            }
    }

    return {show: false, text: '', action: () => {}}
}

export const shdHandleActionButton = () => {
    console.log('ACTION BUTTON')
}

export const getShdPlayerStatusString = (playerId: string) => {
    const status = store.getState().game?.state?.status || ''
    const player = store.getState().game?.state?.players?.find(p => p.id === playerId) as ShdPlayer

    if (player === undefined) {
        return ''
    }

    switch(status) {

        case ShdStatues.INIT:
            return 'Waiting to start...'

        case ShdStatues.PREP:
            if (!player.isReady) {
                return 'Sorting cards...'
            } else {
                return 'Ready to play'
            }

        case ShdStatues.PLAYING:
            if (player.isActive) {
                return 'Playing...'
            } else {
                return 'Waiting for turn...'
            }

        default:
            return ''
    }
}