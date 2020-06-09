import { 
    User,
    SessionLoggedIn, 
    SESSION_LOGGED_IN, 
    SessionActionTypes 
} from './types'

export let userLoggedIn = (user: User): SessionActionTypes => {
    return {
        type: SESSION_LOGGED_IN,
        data: {
            user
        }
    }
}

