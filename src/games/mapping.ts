import { ApiStateTypes, ApiPlayerTypes, ApiCardTypes, IState, IPlayer, ICard, PlayerTypes } from "./types"
import { GameTypes } from "../store/game/types"
import { mapShdApiState, mapShdApiPlayer, mapShdApiCard } from "./shd/logic"

export const mapApiState = (gameType: GameTypes, apiState: ApiStateTypes): IState => {

    switch(gameType) {

        case GameTypes.Shithead:
            return mapShdApiState(apiState)

        default:
            return {} as IState

    }

}

export const mapApiPlayer = (gameType: GameTypes, apiPlayer: ApiPlayerTypes): PlayerTypes => {

    switch(gameType) {

        case GameTypes.Shithead:
            return mapShdApiPlayer(apiPlayer)

        default:
            throw Error('Game type not recognised')

    }
}

export const mapApiCard = (gameType: GameTypes, apiCard: ApiCardTypes): ICard => {

    switch(gameType) {

        case GameTypes.Shithead:
            return mapShdApiCard(apiCard)

        default:
            return {} as ICard

    }

}