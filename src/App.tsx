import React, { useEffect } from 'react';
import { Hub } from 'aws-amplify'
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn, getUser } from './store/session/actions'
import { AppDispatch } from './store'
import { RootState } from './store/rootReducer';
import Menu from './views/Menu';
import Login from './components/Login';

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
  }, [dispatch])

  const isLoggedIn = useSelector((state: RootState) => state.session._isLoggedIn)
  const isUserFetched = useSelector((state: RootState) => state.session.user._isFetched)

  return (
    
    <div>
      {isLoggedIn && isUserFetched ? <Menu/> : <Login/>}
    </div>
  );
}

export default App;
