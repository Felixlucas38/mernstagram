import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Slogan, ButtonGroup } from './style';
import ContainerCentered from '../common/ContainerCentered';
import Button from '../common/Button';
import { Logo, Box } from '../common/ui';

export default class Landing extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>MERNstagram</title>
                </Helmet>
                <ContainerCentered>
                    <Box>
                        <Logo />
                        <Slogan>
                            An Instagram-like application built with the MERN
                            stack, by Felix Lucas.
                        </Slogan>
                        <ButtonGroup>
                            <div>
                                <Button to="/login" primary={1} link={1}>
                                    {/* Prevents styled components warning to pass 1 instead of true */}
                                    Login
                                </Button>
                            </div>
                            <div>
                                <Button to="/signup" link={1}>
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button to="/github" link={1}>
                                    GitHub
                                </Button>
                            </div>
                        </ButtonGroup>
                    </Box>
                </ContainerCentered>
            </div>
        );
    }
}
