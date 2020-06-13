import * as React from 'react'
import { Auth } from 'aws-amplify'

export interface Props {

}

const Login: React.FC<Props> = ({}) => {
    return (
        <div>
            <button onClick={()=>Auth.federatedSignIn()}>Sign in</button>
        </div>
    )
}

export default Login