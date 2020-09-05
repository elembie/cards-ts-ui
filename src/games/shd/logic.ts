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
        order: player.order
    }
}

export const mapShdApiState = (state: ApiShdState): ShdState => {
    return {
        gameType: GameTypes.Shithead, 
        dead: state.dead,
        stack: state.stack,
        status: state.status,
        table: state.table,
        players: state.players.map(p => mapShdApiPlayer(p)),
        currentValue: state.current_value,
        totalPlayers: state.total_players,
    }
}

export const shdToggleCard = (cardId: string) => {
    const { player, selectedCards, state: { status } } = store.getState().game
    const shdPlayer = player as ShdPlayer
    const isSelected = selectedCards.indexOf(cardId) >= 0

    if (isSelected) {
        store.dispatch(unselectCards([cardId]))
        return
    }

    if (status === ShdStatues.PREP) {
        if (selectedCards.length > 0) {
            store.dispatch(clearSelectedCards())
        }
        store.dispatch(selectCards([cardId]))
    }
}

export const shdGetActionButtonProps = (): {show: boolean, text: string, action: () => void} => {
    const { state, meta, player } = store.getState().game

    if (meta.tableSize === meta.playersJoined && !state.status) {
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

    if (state.status === ShdStatues.INIT && player.isDealer) {

        return {
            show: true,
            text: 'DEAL',
            action: () => store.dispatch(sendMessage({
                type: ShdActions.DEAL,
                data: {},
            }))
        }

    } else if (state.status === ShdStatues.PREP && !player.isReady) {

        return {
            show: true, 
            text: 'READY!', 
            action: () => store.dispatch(sendMessage({
                type: ShdActions.READY,
                data: {}
            }))
        }
    }

    return {show: false, text: '', action: () => {}}
}

export const shdHandleActionButton = () => {
    console.log('ACTION BUTTON')
}

export const getShdPlayerStatusString = (playerId: string) => {
    const status = store.getState().game.state.status
    const player = store.getState().game.state.players.find(p => p.id === playerId) as ShdPlayer

    console.log(status, player)

    switch(status) {
        case ShdStatues.PREP:
            if (!player.isReady) {
                return 'Sorting cards...'
            } else {
                return 'Ready to play'
            }
        default:
            return ''
    }
}