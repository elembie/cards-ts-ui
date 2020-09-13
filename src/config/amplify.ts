import { Auth } from 'aws-amplify'
import Constants from './constants'

export const amplifyConfig = {
    Auth: {
        region: 'ap-southeast-2',
        userPoolId: 'ap-southeast-2_H9SN2bqby',
        userPoolWebClientId: '7s15kdmtc3rp33tct70en9u7d0',
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'dx1siihwrx6bg.cloudfront.net',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: false
        },
    },
    API: {
        endpoints: [
            {
                name: Constants.apiName,
                endpoint: 'https://tfvj0ujz67.execute-api.ap-southeast-2.amazonaws.com/dev',
                custom_header: async () => { 
                    return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
                }
            },
        ]
    }
}

export const oauth = {
    domain: 'zrrkyjey2k.auth.ap-southeast-2.amazoncognito.com',
    scope: ['phone', 'email', 'profile', 'openid',],
    redirectSignIn: 'https://dx1siihwrx6bg.cloudfront.net/',
    redirectSignOut: 'https://dx1siihwrx6bg.cloudfront.net/',
    responseType: 'code'
}