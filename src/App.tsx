import React, { useEffect } from 'react';
import { Hub, Auth } from 'aws-amplify'
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn, getUser } from './store/session/actions'
import { AppDispatch } from './store'
import { RootState } from './store/rootReducer';  
import Login from './components/Login';
import AppContainer from './containers/AppContainer';

function App() {

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {

    Hub.listen('auth', (data) => {       
        switch (data.payload.event) {
          case 'signIn':
            dispatch(userLoggedIn(data.payload.data.username))
            dispatch(getUser())
        }  
    })

    Auth.currentAuthenticatedUser()
      .then(u => {
        dispatch(userLoggedIn(u.username))
        dispatch(getUser())
      })

  }, [dispatch])

  const isLoggedIn = useSelector((state: RootState) => state.session._isLoggedIn)

  return (
    
    <div>
      {isLoggedIn ? <AppContainer/> : <Login/>}
    </div>
  );
}

export default App;
