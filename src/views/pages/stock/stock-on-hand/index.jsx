import React, { useRef } from 'react';
import NotificationAlert from 'react-notification-alert';

import {
    Container,
    Card,
    CardBody
} from 'reactstrap';

import MainHeader from '../../../components/headers/MainHeader';

function StockOnHand() {
    const alertEl = useRef(null);

    return (
        <>
            <div className='rna-wrapper'>
                <NotificationAlert ref={alertEl} />
            </div>
            <MainHeader name='Stock on Hand' parentName='Stock Management' />
            <Container className='mt--6 stock-on-hand-container' fluid>
                <Card>
                    <CardBody></CardBody>
                </Card>
            </Container>
        </>
    );
}

export default StockOnHand;