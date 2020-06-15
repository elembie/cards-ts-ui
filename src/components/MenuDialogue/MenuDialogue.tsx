import React, { FunctionComponent } from 'react'
import { OptionsEnum } from '../types'
import styles from './MenuDialogue.module.scss'
import NewGameForm from './NewGameForm'

export interface Props {
    menuOption: OptionsEnum
}

const MenuDialogue: FunctionComponent<Props> = (props) => {

    const { menuOption } = props

    let component: React.ReactNode

    switch(menuOption) {

        case OptionsEnum.newGame:
            component = (<NewGameForm />)
            break

        case OptionsEnum.joinGame:
            component = (<div>Join game</div>)
            break

        default:
            component = null

    }

    return (
        <div className={styles.base}>
            {component}
        </div>
    )
}

export default MenuDialogue