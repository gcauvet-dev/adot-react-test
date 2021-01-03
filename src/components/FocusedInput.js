import React, { useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function FocusedInput(props) {
    const { register, id, name, placeholder } = props;

    const addressRef = useRef(null);

    useEffect(() => {
        addressRef.current.focus();
    }, []);

    return (
        <Form.Control
            autoFocus
            required
            id={id}
            name={name}
            type='text'
            className='modal-address'
            size='lg'
            placeholder={placeholder}
            ref={(inputElement) => {
                register(inputElement);
                addressRef.current = inputElement;
            }}
        />
    );
}

FocusedInput.propTypes = {
    register: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
};

export default FocusedInput;
