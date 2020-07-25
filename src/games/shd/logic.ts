import { 
    ApiShdCard, 
    ShdCard,
    ApiShdPlayer,
    ShdPlayer,
    ApiShdState,
    ShdState,
    ShdStatues,
} from './types'
import store from '../../store'
import { clearSelectedCards, selectCards, unselectCards } from '../../store/game/actions'


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
    console.log('TOGGLING SHD CARD')
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