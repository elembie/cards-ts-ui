import React, { FunctionComponent } from 'react'
import { Auth } from 'aws-amplify'
import styles from './Header.module.scss'


export interface Props {
    username: string,
}

const Header: FunctionComponent<Props> = (props) => {

    const { username } = props

    return (
        <div className={styles.base}>
            <div>{username}</div>
            <div style={{flexGrow: 2}}/>
            <div className={styles.signout}><button onClick={()=>Auth.signOut()}>SIGN OUT</button></div>
        </div>
    )
}

export default Header