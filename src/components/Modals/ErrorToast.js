import React from 'react';
import propTypes from 'prop-types';

import { Toast } from 'react-bootstrap';

const ErrorToast = (props) => {
    const { errorToastVisibility, toggleErrorToastVisibility, error } = props;

    return (
        <Toast
            show={errorToastVisibility}
            onClose={toggleErrorToastVisibility}
            style={{
                position: 'absolute',
                top: 25,
                right: 25,
            }}>
            <Toast.Header>
                <strong className='mr-auto'>Erreur</strong>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
        </Toast>
    );
};

ErrorToast.propTypes = {
    errorToastVisibility: propTypes.bool.isRequired,
    toggleErrorToastVisibility: propTypes.func.isRequired,
    error: propTypes.string.isRequired,
};

export default ErrorToast;
