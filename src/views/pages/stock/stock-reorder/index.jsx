import React from 'react';

import {
    Container,
} from 'reactstrap';

import MainHeader from '../../../components/headers/MainHeader';

function StockReOrder() {
    return (
        <>
            <MainHeader name='Stock to Re-order' parentName='Stock Management' />
            <Container className='mt--6 stock-reorder-container' fluid>
            </Container>
        </>
    );
}

export default StockReOrder;