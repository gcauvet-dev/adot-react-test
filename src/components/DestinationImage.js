import React from 'react';
import propTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled/macro';

function DestinationImage(props) {
    const { imageUrl, city, country, uid, handleSelectedDestinationUid } = props;

    return (
        <Background imageUrl={imageUrl}>
            <DisplayOver>
                <BigTitle>{city}</BigTitle>
                <Hover>
                    <SubTitle>Passer ses vacances ici, c&apos;est possible !</SubTitle>

                    <Paragraph>
                        Découvrez ce pays en visitant <WikiLink href={`https://fr.wikipedia.org/wiki/${country}`}>sa page Wikipedia !</WikiLink>
                    </Paragraph>

                    <EditIcon onClick={() => handleSelectedDestinationUid('edit', uid)}>
                        <FontAwesomeIcon color='#fff' icon={faEdit} size='lg' />
                    </EditIcon>

                    <DeleteIcon onClick={() => handleSelectedDestinationUid('delete', uid)}>
                        <FontAwesomeIcon color='#fff' icon={faTrash} size='lg' />
                    </DeleteIcon>
                </Hover>
            </DisplayOver>
        </Background>
    );
}

const DisplayOver = styled.div({
    height: '221px',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
    zIndex: 2,
    borderRadius: '13px 13px 0 0',
    transition: 'background-color 350ms ease',
    backgroundColor: 'transparent',
    padding: '20px 20px 0 20px',
    boxSizing: 'border-box',
});

const BigTitle = styled.h2({
    fontFamily: 'Roboto',
});

const Hover = styled.div({
    opacity: 0,
    transition: 'opacity 350ms ease',
});

const SubTitle = styled.h4({
    fontFamily: 'Roboto',
    transform: 'translate3d(0,50px,0)',
    transition: 'transform 350ms ease',
});

const Paragraph = styled.p({
    transform: 'translate3d(0,50px,0)',
    transition: 'transform 350ms ease',
});

const EditIcon = styled.div({
    position: 'absolute',
    top: '20px',
    right: '50px',
    cursor: 'pointer',
});

const DeleteIcon = styled.div({
    position: 'absolute',
    top: '20px',
    right: '20px',
    cursor: 'pointer',
});

const WikiLink = styled.a({
    textDecoration: 'none',
    color: '#fff',
});

const Background = styled.div((props) => ({
    // backgroundSize: 'strech',
    // backgroundRepeat: 'no-repeat',
    color: '#FFF',
    width: '441px',
    height: '221px',

    borderRadius: '13px 13px 0 0',
    margin: '0 0 23px',
    background: `url(${props.imageUrl})`,
    [`:hover ${DisplayOver}`]: {
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    [`:hover ${SubTitle}, :hover ${Paragraph}`]: {
        transform: 'translate3d(0,0,0)',
    },
    [`:hover ${Hover}`]: {
        opacity: 1,
    },
    [`:hover ${EditIcon}`]: {
        color: '#000',
    },
}));

DestinationImage.propTypes = {
    imageUrl: propTypes.string.isRequired,
    country: propTypes.string.isRequired,
    city: propTypes.string.isRequired,
    uid: propTypes.string.isRequired,
    handleSelectedDestinationUid: propTypes.func.isRequired,
};

export default DestinationImage;
