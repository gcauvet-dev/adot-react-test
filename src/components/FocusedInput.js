import React, { useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function FocusedInput(props) {
    const { register } = props;

    const addressRef = useRef(null);

    useEffect(() => {
        addressRef.current.focus();
    }, []);

    return (
        <Form.Control
            autoFocus
            required
            id='fullAdress'
            name='fullAdress'
            type='text'
            className='modal-address'
            size='lg'
            placeholder='Adresse'
            ref={(inputElement) => {
                register(inputElement);
                addressRef.current = inputElement;
            }}
        />
    );
}

FocusedInput.propTypes = {
    register: propTypes.func.isRequired,
};

export default FocusedInput;
