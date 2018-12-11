import React from 'react';
import ContainerCentered from './ContainerCentered';
import spinnerSvg from '../../assets/spinner-dark.svg';

const Spinner = () => {
    return (
        <ContainerCentered>
            <img
                style={{ width: '6rem', display: 'block', margin: '0 auto' }}
                src={spinnerSvg}
                alt="Loading..."
            />
        </ContainerCentered>
    );
};

export default Spinner;
