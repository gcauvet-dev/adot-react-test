import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';

import { Card, Col, Row, Image } from 'react-bootstrap';
import Switch from 'react-switch';

import { ImageLoader } from './Loader';
import DestinationImage from './DestinationImage';

import { getImage } from '../services/destination.services';
import DestinationContext from '../helpers/Contexts/DestinationContext';

import '../assets/css/Destination.css';

const Destination = ({ handleEnableSwitch, handleSelectedDestinationUid }) => {
    const destination = useContext(DestinationContext) || {};
    const { visited, images: { flag, url, alt } = {}, country, capital, uid, statistics: { population, languages, area } = {} } = destination;

    const [imageUrl, setImageUrl] = useState(url);

    const updateDestinationImage = (result) => {
        destination.images.url = result;
        setImageUrl(result);
    };

    useEffect(() => {
        const fetchImage = async () => getImage(country).then((result) => updateDestinationImage(result));
        if (!url) fetchImage();
    }, [url]);

    return (
        <Card className='destination'>
            {url ? <DestinationImage visited={visited} uid={uid} imageUrl={imageUrl} country={country} handleSelectedDestinationUid={handleSelectedDestinationUid} /> : <ImageLoader />}

            <Row className='capital-row'>
                <Card.Text className='capital'>
                    <Image src={flag} alt={alt} style={{ width: 24, marginBottom: 5 }} /> {capital || 'N/A'}
                </Card.Text>
            </Row>

            <span className='path' />

            <Row className='stat destination-row'>
                <Col>
                    <Card.Text>{(population && population.toLocaleString()) || 'N/A'}</Card.Text>
                </Col>

                <Col>
                    <Card.Text>{languages || 'N/A'}</Card.Text>
                </Col>

                <Col>
                    <Card.Text>{(area && area.toLocaleString()) || 'N/A'}</Card.Text>
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
                    <Card.Text>Population</Card.Text>
                </Col>

                <Col style={{ padding: 0 }}>
                    <Card.Text>Language</Card.Text>
                </Col>

                <Col style={{ padding: 0 }}>
                    <Card.Text>km²</Card.Text>
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
            area: propTypes.number,
        }),
    }),
    handleEnableSwitch: propTypes.func.isRequired,
    handleSelectedDestinationUid: propTypes.func.isRequired,
};

Destination.defaultProps = {
    destination: {},
};

export default Destination;
