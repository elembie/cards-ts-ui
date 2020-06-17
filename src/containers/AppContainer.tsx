import React, { FunctionComponent, Fragment } from 'react'
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Menu from '../views/Menu';
import GameContainer from './GameContainer';
import { RootState } from '../store/rootReducer';
import Loading from '../components/Loading';
import Header from '../components/Header';

const AppContainer: FunctionComponent = () => {

    const session = useSelector((state: RootState) => state.session)
    const { user } = session

    return (
        <Fragment>

            <Header username={user.name || ''}/>

        {user.isFetched || session.isNewUser ?

            (
                <Router>
                    <Switch>

                        <Route exact path='/'>
                            <Menu />
                        </Route>

                        <Route path='/game/:gameId'>
                            <GameContainer/>
                        </Route>

                    </Switch>
                </Router>
            )

            : (
                <Loading dark={false} />
            )}

        
        </Fragment>

    )
}

export default AppContainer