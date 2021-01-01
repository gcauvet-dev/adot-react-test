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
    const { visited, fullAddress, images: { flag, url, alt } = {}, country, countryCode, city, uid, statistics: { population, hotels, averageIncome, surface } = {} } = destination;

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
            {url ? <DestinationImage visited={visited} uid={uid} imageUrl={imageUrl} country={country} city={city} handleSelectedDestinationUid={handleSelectedDestinationUid} /> : <ImageLoader />}

            <Row style={{ justifyContent: 'flex-start', alignItems: 'center', minHeight: 80 }}>
                <Card.Text className='address'>
                    {fullAddress} <Image src={flag} alt={alt} style={{ width: 24, marginBottom: 5 }} />
                </Card.Text>
            </Row>

            <span className='path' />

            <Row className='stat destination-row'>
                <Col>
                    <Card.Text>{population}</Card.Text>
                </Col>

                <Col>
                    <Card.Text>{hotels}</Card.Text>
                </Col>

                <Col>
                    <Card.Text>{averageIncome}</Card.Text>
                </Col>

                <Col>
                    <Card.Text>{surface}</Card.Text>
                </Col>

                <Col>
                    <Switch
                        onChange={handleEnableSwitch}
                        id={uid}
                        checked={visited}
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
                    <Card.Text>Habitants</Card.Text>
                </Col>

                <Col style={{ padding: 0 }}>
                    <Card.Text>Hôtels</Card.Text>
                </Col>

                <Col style={{ padding: 0 }}>
                    <Card.Text>Revenu Moy</Card.Text>
                </Col>

                <Col style={{ padding: 0 }}>
                    <Card.Text>m²</Card.Text>
                </Col>
                <Col style={{ padding: 0 }}>
                    <Card.Text>Visité</Card.Text>
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
        fullAddress: propTypes.string,
        statistics: propTypes.shape({
            population: propTypes.number,
            hotels: propTypes.number,
            averageIncome: propTypes.number,
            surface: propTypes.number,
        }),
    }),
    handleEnableSwitch: propTypes.func.isRequired,
    handleSelectedDestinationUid: propTypes.func.isRequired,
};

Destination.defaultProps = { destination: {} };

export default Destination;
