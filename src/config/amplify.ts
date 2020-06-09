export const amplifyConfig = {
    Auth: {
        region: 'ap-southeast-2',
        userPoolId: 'ap-southeast-2_H9SN2bqby',
        userPoolWebClientId: '7s15kdmtc3rp33tct70en9u7d0',
        oauth: {
            domain: 'zrrkyjey2k.auth.ap-southeast-2.amazoncognito.com',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://localhost:3000/',
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'code'
        },
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'localhost',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: false
        },
    }
}