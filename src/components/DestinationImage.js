import React from 'react';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import SocialMediaButtons from 'react-social-media-buttons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled/macro';

import destinationImageActionTypes from '../helpers/Enums/DestinationImageActionTypes';

function DestinationImage(props) {
    const { imageUrl, city, country, uid, visited, handleSelectedDestinationUid } = props;

    return (
        <Background imageUrl={imageUrl}>
            <DisplayOver>
                <BigTitle>{city}</BigTitle>

                <Hover>
                    {visited ? (
                        <>
                            <SubTitle>Félicitation, vous avez déjà visité cet endroit !</SubTitle>

                            <Paragraph>Partagez vos moments préférés avec vos amis :</Paragraph>

                            <SocialMediaButtons
                                key={uuidv4()}
                                links={['https://www.facebook.com/', 'https://twitter.com/', 'https://www.instagram.com/', 'https://www.linkedin.com/']}
                                buttonStyle={{ width: '50px', height: '50px', margin: '0px 5px', borderRadius: '50%' }}
                                iconStyle={{ color: '#ffffff' }}
                                openNewTab
                            />
                        </>
                    ) : (
                        <>
                            <SubTitle>Passer vos vacances ici, c&apos;est possible !</SubTitle>

                            <Paragraph>
                                Découvrez ce pays en visitant <WikiLink href={`https://fr.wikipedia.org/wiki/${country}`}>sa page Wikipedia !</WikiLink>
                            </Paragraph>
                        </>
                    )}

                    <RefreshIcon onClick={() => handleSelectedDestinationUid(destinationImageActionTypes.REFRESH, uid)}>
                        <FontAwesomeIcon color='#fff' icon={faSyncAlt} size='lg' />
                    </RefreshIcon>

                    <EditIcon onClick={() => handleSelectedDestinationUid(destinationImageActionTypes.EDIT, uid)}>
                        <FontAwesomeIcon color='#fff' icon={faEdit} size='lg' />
                    </EditIcon>

                    <DeleteIcon onClick={() => handleSelectedDestinationUid(destinationImageActionTypes.DELETE, uid)}>
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

const RefreshIcon = styled.div({
    position: 'absolute',
    top: '20px',
    right: '80px',
    cursor: 'pointer',
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
    // margin: '0 0 23px',
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
    visited: propTypes.bool.isRequired,
    handleSelectedDestinationUid: propTypes.func.isRequired,
};

export default DestinationImage;