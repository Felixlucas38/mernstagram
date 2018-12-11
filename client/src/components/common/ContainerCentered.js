import React from 'react';
import styled from 'styled-components';

const ContainerCentered = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    padding: 8rem 0 2rem 0;

    & > div {
        width: 100%;
        max-width: 35rem;
    }

    @media (max-width: 480px) {
        padding: 7rem 0 7rem 0;
    }
`;

export default ({ children }) => {
    return (
        <ContainerCentered>
            <div>{children}</div>
        </ContainerCentered>
    );
};
