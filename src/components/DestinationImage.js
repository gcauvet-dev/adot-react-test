import React from 'react';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import SocialMediaButtons from 'react-social-media-buttons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled/macro';

import destinationImageActionTypes from '../helpers/Enums/DestinationImageActionTypes';

function DestinationImage({ imageUrl, country, uid, visited, handleSelectedDestinationUid }) {
    const links = ['https://www.facebook.com/', 'https://twitter.com/', 'https://www.instagram.com/', 'https://www.linkedin.com/'];

    return (
        <Background imageUrl={imageUrl}>
            <DisplayOver>
                <BigTitle>{country}</BigTitle>

                <Hover>
                    {visited ? (
                        <>
                            <SubTitle>Congratulation, you already visited this place!</SubTitle>

                            <Paragraph>Share your favorite moments with your friends:</Paragraph>

                            <SocialMediaButtons
                                key={uuidv4()}
                                links={links}
                                buttonStyle={{ width: '50px', height: '50px', margin: '0 5px', borderRadius: '50%' }}
                                iconStyle={{ color: '#ffffff' }}
                                openNewTab
                            />
                        </>
                    ) : (
                        <>
                            <SubTitle>You next holiday here? It&apos;s possible !</SubTitle>

                            <Paragraph>
                                Discover {country} on <WikiLink href={`https://fr.wikipedia.org/wiki/${country}`}>Wikipedia !</WikiLink>
                            </Paragraph>
                        </>
                    )}

                    <InfoIcon onClick={() => handleSelectedDestinationUid(destinationImageActionTypes.INFO, uid)}>
                        <WikiLink href={`https://fr.wikipedia.org/wiki/${country}`}>
                            <FontAwesomeIcon color='#fff' icon={faInfoCircle} />
                        </WikiLink>
                    </InfoIcon>

                    <DeleteIcon onClick={() => handleSelectedDestinationUid(destinationImageActionTypes.DELETE, uid)}>
                        <FontAwesomeIcon color='#fff' icon={faTrash} />
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

const InfoIcon = styled.div({
    position: 'absolute',
    top: '20px',
    right: '40px',
    cursor: 'pointer',
});

const DeleteIcon = styled.div({
    position: 'absolute',
    top: '20px',
    right: '20px',
    cursor: 'pointer',
});

const WikiLink = styled.a({
    color: '#fff',
});

const Background = styled.div((props) => ({
    backgroundSize: 'cover !important',
    backgroundRepeat: 'no-repeat !important',
    color: '#FFF',
    height: '221px',
    borderRadius: '13px 13px 0 0',
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
}));

DestinationImage.propTypes = {
    imageUrl: propTypes.string.isRequired,
    country: propTypes.string.isRequired,
    uid: propTypes.string.isRequired,
    visited: propTypes.bool.isRequired,
    handleSelectedDestinationUid: propTypes.func.isRequired,
};

export default DestinationImage;