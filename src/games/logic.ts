import { GameTypes } from "../store/game/types";
import { shdToggleCard } from './shd/logic'

export const selectCard = (cardId: string, gameType: GameTypes) => {
    console.log('SELECTING CARD')
    switch(gameType) {
        case GameTypes.Shithead:
            shdToggleCard(cardId)
            break

        default:
    }
}