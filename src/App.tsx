import React, { useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify'
import { useDispatch } from 'react-redux';
import { amplifyConfig } from './config/amplify'
import { userLoggedIn, getUser } from './store/session/actions'
import { AppDispatch } from './store'

Amplify.configure(amplifyConfig)
function App() {

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {

    Auth.currentAuthenticatedUser()
      .then(u => {
        console.log(u)
        dispatch(userLoggedIn(u.username))
        dispatch(getUser())
      })
      .catch(e => console.log(e))

  })

  return (
    
    <div>
      <button onClick={()=>Auth.federatedSignIn()}>Sign in</button>
    </div>
  );
}

export default App;
