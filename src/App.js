import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './components/Navigation';
import Home from './components/Home';
import SignUpPage from './auth/SignUp';
import SignInPage from './auth/SignIn';
import PasswordForgetPage from './auth/PasswordForget';

import * as routes from './components/Routes';
import withAuthentication from './auth/withAuthentication';
import { firebase } from './firebase'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser ?
                this.setState(() => ({ authUser }))
                : this.setState(() => ({ authUser: null }));
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser}/>

                    <Route exact path={routes.HOME} component={() => <Home/>}/>
                    <Route exact path={routes.SIGN_UP} component={() => <SignUpPage/>}/>
                    <Route exact path={routes.SIGN_IN} component={() => <SignInPage/>}/>
                    <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage/>}/>
                </div>
            </Router>
        )
    }
}

export default withAuthentication(App);