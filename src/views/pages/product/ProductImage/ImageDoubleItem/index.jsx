import React from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
} from 'reactstrap';

function ImageDoubleItem(props) {
    return (
        <Card>
            <CardBody className="custom-procut-image-card image-process-panel pb-1">
                <Row>
                    <Col md={2} className="p-0">
                        <h4 className="mb-4">{"Adult Tees"}</h4>
                        <div className="image-prview mb-4" />
                        <Button
                            type='button'
                            color='primary'
                            className="custom-upload-button"
                            size="sm"
                        >
                            {"Upload"}
                        </Button>
                    </Col>
                    <Col md={5} className="p-0">
                        <img
                            className="image-process mb-2"
                            src="https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-light/e_displace,x_15,y_15,l_adult-tees:Mens-Displacement-Set1/u_adult-tees:Mens-Gildan-64000-Set-1-WH,y_0/adult-tees/Mens-Gildan-64000-Set-1-WH"
                        />
                        <Row>
                            <Col
                                md={4} style={{ textAlign: 'end' }}
                                className="pr-0"
                            >
                                <h5 className="custom-color-picker-title m-0">
                                    {"Mens"}
                                </h5>
                            </Col>
                            <Col
                                md={8}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <div className="custom-color-picker">
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                md={4}
                                style={{ textAlign: 'end' }}
                                className="pr-0"
                            >
                                <h5 className="custom-color-picker-title m-0">
                                    {"Womens"}
                                </h5>
                            </Col>
                            <Col
                                md={8}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <div className="custom-color-picker">
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'red' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'yellow' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'grey' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'blue' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={5} className="p-0">
                        <img
                            className="image-process mb-2"
                            src="https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-dark/e_displace,x_15,y_15,l_adult-tees:Mens-Displacement-Set1/u_adult-tees:Mens-Gildan-64000-Set-1-OR,y_0/adult-tees/Mens-Gildan-64000-Set-1-OR"
                        />
                        <Row>
                            <Col
                                md={4} style={{ textAlign: 'end' }}
                                className="pr-0"
                            >
                                <h5 className="custom-color-picker-title m-0">
                                    {"Mens"}
                                </h5>
                            </Col>
                            <Col
                                md={8}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <div className="custom-color-picker">
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                md={4}
                                style={{ textAlign: 'end' }}
                                className="pr-0"
                            >
                                <h5 className="custom-color-picker-title m-0">
                                    {"Womens"}
                                </h5>
                            </Col>
                            <Col
                                md={8}
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <div className="custom-color-picker">
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'pink' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'red' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'yellow' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'grey' }}
                                    />
                                    <div
                                        className="custom-color-picker-item-one mr-1"
                                        style={{ backgroundColor: 'blue' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default ImageDoubleItem;