import { 
    ApiShdCard, 
    ShdCard,
    ApiShdPlayer,
    ShdPlayer,
    ApiShdState,
    ShdState,
} from './types'


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

const shdCanSelectCard = (cardId: string) => {
    const gameState = store.getState
}