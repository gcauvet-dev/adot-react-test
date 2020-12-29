import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import Switch from 'react-switch';

import DestinationContext from '../helpers/Contexts/DestinationContext';

import defaultImage from '../assets/images/default.png';
import '../assets/css/Destination.css';

const Destination = ({ handleSwitch }) => {
    const destination = useContext(DestinationContext) || [];
    const { enabled, fullAdress, city, uid, statistics: { population, hotels, averageIncome, surface } = {} } = destination;

    return (
        <Card className='destination' key={uid}>
            <Card.Img variant='top' src={defaultImage} className='image' />

            <Row style={{ alignItems: 'center' }}>
                <Col sm={9}>
                    <Card.Text className='city-name'>{city}</Card.Text>
                    <Card.Text className='address'>{fullAdress}</Card.Text>
                </Col>

                <Col sm={3}>
                    <Switch
                        onChange={handleSwitch}
                        checked={enabled}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor='#9fe9c5'
                        offHandleColor='#5c5757'
                        onHandleColor='#3fd38b'
                        height={14}
                        width={36}
                        handleDiameter={20}
                    />
                </Col>
            </Row>

            <hr />

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
            </Row>
        </Card>
    );
};

Destination.propTypes = {
    destination: propTypes.shape({
        enabled: propTypes.bool,
        fullAdress: propTypes.string,
        statistics: propTypes.shape({
            population: propTypes.number,
            hotels: propTypes.number,
            averageIncome: propTypes.number,
            surface: propTypes.number,
        }),
    }),
    handleSwitch: propTypes.func.isRequired,
};

Destination.defaultProps = { destination: {} };

export default Destination;
