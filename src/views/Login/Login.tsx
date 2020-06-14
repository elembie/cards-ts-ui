import * as React from 'react'
import { Auth } from 'aws-amplify'
import Button from '../Button'
import styles from './Login.module.scss'

export interface Props {

}

const Login: React.FC<Props> = ({}) => {
    return (
        <div className={styles.base}>
            <div className={styles.content}>
                <Button text='Sign in' onClick={()=>Auth.federatedSignIn()} />
            </div>
        </div>
    )
}

export default Login