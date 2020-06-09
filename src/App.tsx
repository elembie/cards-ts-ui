import React, { useEffect } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify'
import { amplifyConfig } from './config/amplify'

Amplify.configure(amplifyConfig)

function App() {

  useEffect(() => {

    Hub.listen('auth', ({ payload }) => {
      console.log(payload)
    })

    Auth.currentAuthenticatedUser()
      .then(u => console.log(u))
      .catch(e => console.log(e))

  })

  return (
    
    <div>
      <button onClick={()=>Auth.federatedSignIn()}>Sign in</button>
    </div>
  );
}

export default App;
