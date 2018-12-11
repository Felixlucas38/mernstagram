import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './actions/userActions';
import userService from './services/userService';

import Login from './components/Login';

// --- Testing
import Temporal from './components/Temporal';
import SignUp from './components/SignUp';
import Landing from './components/Landing';
import TopBar from './components/Layout/TopBar';
import Home from './components/Home';
import PrivateRoute from './components/common/PrivateRoute';
import Profile from './components/Profile';
import Explore from './components/Explore';
import SinglePost from './components/SinglePost';
import EditProfile from './components/EditProfile';
import AddPost from './components/AddPost';
import MobileActions from './components/Layout/MobileActions';
import EditPost from './components/AddPost/EditPost';

class App extends Component {
    componentWillMount() {
        this.props.setCurrentUser(userService.getCurrentUser());
    }

    render() {
        const { auth } = this.props;

        return (
            <Router>
                <div>
                    {auth.isAuthenticated && (
                        <div>
                            <TopBar />
                            <MobileActions />
                        </div>
                    )}

                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() =>
                                auth.isAuthenticated ? <Home /> : <Landing />
                            }
                        />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <PrivateRoute path="/explore" component={Explore} />
                        <PrivateRoute path="/post/:id" component={SinglePost} />
                        <PrivateRoute
                            path="/update-post/:id"
                            component={EditPost}
                        />
                        {/* If user goes to "profile", get redirected to own profile */}
                        <Route
                            exact
                            path="/profile"
                            render={() =>
                                auth.isAuthenticated ? (
                                    <Redirect
                                        to={`/profile/${auth.user.username}`}
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <PrivateRoute
                            path="/profile/:username"
                            component={Profile}
                        />
                        <PrivateRoute
                            path="/edit-profile"
                            component={EditProfile}
                        />
                        <PrivateRoute path="/add" component={AddPost} />
                        <Route component={Temporal} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default connect(
    ({ auth }) => ({ auth }),
    { setCurrentUser }
)(App);
