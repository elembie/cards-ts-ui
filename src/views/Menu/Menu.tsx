import React, { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { User } from '../../store/session/types'
import { RootState } from '../../store/rootReducer'
import styles from './Menu.module.scss'
import Button from '../../components/Button'
import { OptionsEnum, MenuOptions } from '../../components/types'

export interface Props {

}

const Menu: FunctionComponent<Props> = ({}) => {

    const [selectedOption, setSelectedOption] = useState<OptionsEnum>(OptionsEnum.noneSelected)

    return (
        <div className={styles.base}>

            <div className={styles.buttons}>
                {MenuOptions.map(
                    o => <Button classname={styles.button} key={o.option} text={o.text} onClick={()=>setSelectedOption(o.option)} />)}
            </div>

            <div className={styles.options}>
                Options
            </div>
            
        </div>
    )
}

export default Menu