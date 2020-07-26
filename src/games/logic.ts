import { GameTypes } from "../store/game/types";
import { shdToggleCard, shdHandleActionButton, shdGetActionButtonProps } from './shd/logic'

export const selectCard = (cardId: string, gameType: GameTypes) => {
    switch(gameType) {
        case GameTypes.Shithead:
            shdToggleCard(cardId)
            break

        default:
    }
}

export const handleActionButton = (gameType: GameTypes) => {
    switch(gameType) {
        case GameTypes.Shithead:
            shdHandleActionButton()
            break
        default:
    }
}

export const getActionButtonProps = (gameType: GameTypes): {show: boolean, text: string, action: () => void} => {
    switch(gameType) {
        case GameTypes.Shithead:
            return shdGetActionButtonProps()
        default:
            return {show: false, text: '', action: () => {}}
    }
}