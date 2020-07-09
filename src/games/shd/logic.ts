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
        ...card,
        isSpecial: card.is_special,
        playedBy: card.played_by,
    }
}

export const mapShdApiPlayer = (player: ApiShdPlayer): ShdPlayer => {
    return {
        ...player,
        canBurn: player.can_burn,
        canPlay: player.can_play,
        isActive: player.is_active,
        isDealer: player.is_dealer,
        isOut: player.is_out,
        isSh: player.is_sh,
        isReady: player.is_ready,
        shCount: player.sh_count,
    }
}

export const mapShdApiState = (state: ApiShdState): ShdState => {
    return {
        ...state,
        currentValue: state.current_value,
        totalPlayers: state.total_players,
    }
}