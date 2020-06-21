import React, { FunctionComponent } from 'react'
import { Auth } from 'aws-amplify'
import styles from './Header.module.scss'
import { AppDispatch } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { leaveGame } from '../../store/game/actions'
import { RootState } from '../../store/rootReducer'

export interface Props {
    username: string,
}

const Header: FunctionComponent<Props> = (props) => {

    const { username } = props
    const { gameId, inGame } = useSelector((state: RootState) => state.session.user)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className={styles.base}>
            <div>{username}</div>
            <div style={{flexGrow: 2}}/>
            <div className={styles.signout}>
                <button 
                    onClick={()=>{
                        if (inGame) {
                            dispatch(leaveGame(gameId || ''))
                        } else {
                            Auth.signOut()
                        }
                    }}
                >
                    {inGame ? 'EXIT GAME' : 'SIGN OUT'}
                </button>
            </div>
        </div>
    )
}

export default Header