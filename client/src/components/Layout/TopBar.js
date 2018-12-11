import React from 'react';
import { Link } from 'react-router-dom';
import { TopBarContainer } from './style';
import { Container, Logo } from '../common/ui';

const TopBar = () => {
    return (
        <TopBarContainer>
            <Container>
                <div>
                    <Link to="/">
                        <Logo small />
                    </Link>
                </div>
                <div>
                    <Link to="/add">
                        <i className="far fa-plus-square" />
                    </Link>
                    <Link to="/explore">
                        <i className="far fa-compass" />
                    </Link>
                    <Link to="/profile">
                        <i className="far fa-user" />
                    </Link>
                </div>
            </Container>
        </TopBarContainer>
    );
};

export default TopBar;
