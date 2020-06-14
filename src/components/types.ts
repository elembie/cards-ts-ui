export enum OptionsEnum {
    noneSelected = 0,
    newGame = 1,
    joinGame = 2,
}

export interface MenuOption {
    option: OptionsEnum,
    text: string,
}

export const MenuOptions: MenuOption[] = [
    {
        option: OptionsEnum.newGame,
        text: 'new game'
    },
    {
        option: OptionsEnum.joinGame,
        text: 'join game'
    }
]