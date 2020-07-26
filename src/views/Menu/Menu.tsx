import React, { FunctionComponent, useState } from 'react'
import styles from './Menu.module.scss'
import Button from '../../components/Button'
import { OptionsEnum, MenuOption } from '../../components/types'
import MenuDialogue from '../../components/Menu'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import NewUserModal from '../../components/Menu/NewUserModal'
import { Redirect } from 'react-router-dom'

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

const Menu: FunctionComponent = () => {

    const [selectedOption, setSelectedOption] = useState<OptionsEnum>(OptionsEnum.noneSelected)
    const { isNewUser, user: { inGame, gameId }} = useSelector((state: RootState) => state.session)
    const { hasLeftGame, isLeavingGame } = useSelector((state: RootState) => state.game)

    if (!(hasLeftGame || isLeavingGame) && inGame && gameId !== undefined) {

        return <Redirect to={`/game/${gameId}`} />
        
    } else {

        return (
            <div className={styles.base}>
    
                <div className={styles.buttons}>
                    {MenuOptions.map(o => 
                        <Button classname={styles.button} key={o.option} text={o.text} onClick={()=>setSelectedOption(o.option)} />
                    )}
                </div>
    
                <div className={styles.options}>
                    <MenuDialogue menuOption={selectedOption} />
                </div>
                
                <NewUserModal isNewUser={isNewUser} />
    
            </div>
        )

    }

    
}

export default Menu