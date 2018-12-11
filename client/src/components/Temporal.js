import React, { Component } from 'react';
import { connect } from 'react-redux';

// --- Testing
import { loginUser, signUpUser, updateUser } from '../actions/userActions';
import { getProfile } from '../actions/profileActions';
import Button from './common/Button';

class Temporal extends Component {
    render() {
        const { auth, profile } = this.props;

        return (
            <div>
                <h1>App</h1>
                <br />
                <br />
                <br />
                <h2>User test</h2>
                <p>isAuthenticated: {auth.isAuthenticated ? 'Yes' : 'No'} </p>
                <p>auth loading: {auth.isLoading ? 'Yes' : 'No'}</p>
                <p>User: {JSON.stringify(auth.user)}</p>
                <button
                    onClick={() =>
                        this.props.loginUser({
                            email: 'felixlucas38@gmail.com',
                            password: '11111111'
                        })
                    }
                >
                    Login
                </button>
                &nbsp;
                <button
                    onClick={() =>
                        this.props.signUpUser({
                            email: 'felixlucas38@gmail.com',
                            password: '11111111'
                        })
                    }
                >
                    Sign Up
                </button>
                &nbsp;
                <button
                    onClick={() =>
                        this.props.updateUser({
                            email: 'felixlucas38@gmail.com',
                            password: '11111111'
                        })
                    }
                >
                    Update
                </button>
                <hr />
                <hr />
                <h2>Profiles</h2>
                <div>
                    <h4>profile.data</h4>
                    <button
                        onClick={() => this.props.getProfile('felixlucas38')}
                    >
                        getProfile
                    </button>
                    {profile.isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        <div>profile: {JSON.stringify(profile.data)}</div>
                    )}
                </div>
                <hr />
                <hr />
                <div>
                    <h2>Posts</h2>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* --- */}
                <Button>Hello</Button>
            </div>
        );
    }
}

export default connect(
    ({ auth, profile }) => ({ auth, profile }),
    { loginUser, signUpUser, updateUser, getProfile }
)(Temporal);
