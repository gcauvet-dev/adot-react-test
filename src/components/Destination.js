import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Card, Col, Row, Image } from 'react-bootstrap';

import Switch from 'react-switch';

import { getImage } from '../services/destination.services';

import { ImageLoader } from './Loader';
import DestinationImage from './DestinationImage';

import DestinationContext from '../helpers/Contexts/DestinationContext';

import '../assets/css/Destination.css';

const Destination = ({ handleEnableSwitch, handleSelectedDestinationUid }) => {
    const destination = useContext(DestinationContext) || {};
    const { visited, images: { flag, url, alt } = {}, country, countryCode, capital, uid, statistics: { population, languages, averageIncome, area } = {} } = destination;

    const [imageUrl, setImageUrl] = useState(url);

    const updateDestinationImage = (result) => {
        destination.images.url = result;
        setImageUrl(result);
    };

    useEffect(() => {
        const fetchImage = async () => getImage(country).then((result) => updateDestinationImage(result));
        if (!url && country && countryCode) fetchImage();
    }, [url]);

    return (
        <Card className='destination'>
            {url ? (
                <DestinationImage
                    src={flag}
                    alt={alt}
                    visited={visited}
                    uid={uid}
                    imageUrl={imageUrl}
                    country={country}
                    capital={capital}
                    handleSelectedDestinationUid={handleSelectedDestinationUid}
                />
            ) : (
                <ImageLoader />
            )}

            <Row style={{ justifyContent: 'flex-start', alignItems: 'center', minHeight: 50 }}>
                <Card.Text className='address'>
                    <Image src={flag} alt={alt} style={{ width: 24, marginBottom: 5 }} /> {capital}
                </Card.Text>
            </Row>

            <span className='path' />

            <Row className='stat destination-row'>
                <Col>
                    <Card.Text>{population}</Card.Text>
                </Col>

                <Col>
                    <Card.Text>{languages}</Card.Text>
                </Col>

                <Col>
                    <Card.Text>{averageIncome}</Card.Text>
                </Col>

                <Col>
                    <Card.Text>{area}</Card.Text>
                </Col>

                <Col>
                    <Switch
                        onChange={handleEnableSwitch}
                        id={uid}
                        checked={visited || false}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor='#9fe9c5'
                        offHandleColor='#5c5757'
                        onHandleColor='#3fd38b'
                        height={10}
                        width={22}
                        handleDiameter={12}
                    />
                </Col>
            </Row>

            <Row className='label destination-row'>
                <Col style={{ padding: 0 }}>
                    <Card.Text>Pop.</Card.Text>
                </Col>

                <Col style={{ padding: 0 }}>
                    <Card.Text>Lang.</Card.Text>
                </Col>

                <Col style={{ padding: 0 }}>
                    <Card.Text>GDP</Card.Text>
                </Col>

                <Col style={{ padding: 0 }}>
                    <Card.Text>km2</Card.Text>
                </Col>
                <Col style={{ padding: 0 }}>
                    <Card.Text>Visited</Card.Text>
                </Col>
            </Row>
        </Card>
    );
};

Destination.propTypes = {
    destination: propTypes.shape({
        visited: propTypes.bool,
        image: propTypes.shape({
            url: propTypes.string,
            alt: propTypes.string,
        }),
        statistics: propTypes.shape({
            population: propTypes.number,
            languages: propTypes.number,
            averageIncome: propTypes.number,
            area: propTypes.number,
        }),
    }),
    handleEnableSwitch: propTypes.func.isRequired,
    handleSelectedDestinationUid: propTypes.func.isRequired,
};

Destination.defaultProps = {
    destination: {
        visited: false,
        image: {
            url: '',
            alt: '',
        },
        statistics: {
            population: 0,
            languages: 0,
            averageIncome: 0,
            area: 0,
        },
    },
};

export default Destination;
