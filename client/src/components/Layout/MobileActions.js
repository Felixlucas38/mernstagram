import React from 'react';
import { Link } from 'react-router-dom';
import { MobileActionsContainer } from './style';

export default () => (
    <MobileActionsContainer>
        <div>
            <Link to="/">
                <i className="fas fa-home" />
            </Link>
        </div>
        <div>
            <Link to="/add">
                <i className="far fa-plus-square" />
            </Link>
        </div>
        <div>
            <Link to="/explore">
                <i className="far fa-compass" />
            </Link>
        </div>
        <div>
            <Link to="/profile">
                <i className="far fa-user" />
            </Link>
        </div>
    </MobileActionsContainer>
);
