import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

import {
    Container,
    Card,
    CardBody,
    Row,
    Col,
    Button,
} from 'reactstrap';

import MainHeader from '../../../components/headers/MainHeader';
import ImageDoubleItem from './ImageDoubleItem';
import ImageSingleItem from './ImageSingleItem';


function ProductImage() {
    
    return (
        <>
            <MainHeader name='Product Image' parentName='Product' />
            <Container className='mt--6 product-image-container' fluid>
                <LoadingOverlay
                    active={false}
                    text='Uploading your image. Just a wait'
                    spinner
                >
                    <Card style={{ minHeight: '700px' }}>
                        <CardBody className="pl-6 pr-6">
                            <Row>
                                <Col md={8}>
                                    <h4 className='display-4 ml-3 mb-3'>
                                        {"Product Title"}
                                    </h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Card>
                                        <CardBody className="custom-procut-image-card">
                                            <Button
                                                type='button'
                                                color='primary'
                                            >
                                                {"Original PDF"}
                                            </Button>
                                            <Button
                                                type='button'
                                                color='primary'
                                            >
                                                {"For Light"}
                                            </Button>
                                            <Button
                                                type='button'
                                                color='primary'
                                            >
                                                {"For Dark"}
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={7}>
                                    <ImageDoubleItem />
                                </Col>
                                <Col md={5}>
                                    <ImageSingleItem />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </LoadingOverlay>
            </Container>
        </>
    );
}

export default ProductImage;