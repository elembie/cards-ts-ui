export enum OptionsEnum {
    noneSelected = 0,
    newGame = 1,
    joinGame = 2,
}

export interface MenuOption {
    option: OptionsEnum,
    text: string,
}
