import React, { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { User } from '../../store/session/types'
import { RootState } from '../../store/rootReducer'
import styles from './Menu.module.scss'
import Button from '../../components/Button'
import { OptionsEnum, MenuOption } from '../../components/types'
import MenuDialogue from '../../components/MenuDialogue'

export interface Props {

}

const MenuOptions: MenuOption[] = [
    {
        option: OptionsEnum.newGame,
        text: 'new game'
    },
    {
        option: OptionsEnum.joinGame,
        text: 'join game'
    }
]

const Menu: FunctionComponent<Props> = ({}) => {

    const [selectedOption, setSelectedOption] = useState<OptionsEnum>(OptionsEnum.noneSelected)

    return (
        <div className={styles.base}>

            <div className={styles.buttons}>
                {MenuOptions.map(
                    o => <Button classname={styles.button} key={o.option} text={o.text} onClick={()=>setSelectedOption(o.option)} />)}
            </div>

            <div className={styles.options}>
                <MenuDialogue menuOption={selectedOption} />
            </div>
            
        </div>
    )
}

export default Menu