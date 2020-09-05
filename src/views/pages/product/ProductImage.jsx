import React from 'react';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';

import {
    Container,
    Card,
    CardBody,
    Row,
    Col,
    Button,
    Label,
    Input
} from 'reactstrap';

import MainHeader from '../../components/headers/MainHeader';


class ProductImage extends React.Component {
    render() {
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
                                    </Col>
                                    <Col md={5}>
                                        <Card>
                                            <CardBody className="custom-procut-image-card image-process-panel pb-3">
                                                <Row>
                                                    <Col md={5} className="p-0">
                                                        <div style={{ height: '92%' }}>
                                                            <h4 className="mb-4">{"Mugs"}</h4>
                                                            <div className="image-prview mb-4" />
                                                            <Button
                                                                type='button'
                                                                color='primary'
                                                                className="custom-upload-button mb-3"
                                                                size="sm"
                                                            >
                                                                {"Upload"}
                                                            </Button>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: "center" }} className="ml-3">
                                                            <Label className="custom-toggle">
                                                                <Input type="checkbox" defaultChecked={true} />
                                                                <span className="custom-toggle-slider rounded-circle" />
                                                            </Label>
                                                            <small className="ml-2">{"For Light"}</small>
                                                            <img
                                                                src={require(`assets/img/theme/color-wheel.png`)}
                                                                style={{ width: '12%', height: '12%' }} className="ml-2"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={7} className="p-0">
                                                        <img
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/fetch/l_mugs:radial,e_displace,y_-6/l_mugs:mug-shape,g_center,fl_cutter/e_multiply,u_mugs:Mug-OR,x_100,y_-37,w_1000/l_mugs:mug-screen,e_screen,x_-100,y_37/https:/res.cloudinary.com/umbrellaink/image/upload/w_0.85,h_0.87/c_crop,c_fit,w_374/w_1.0,h_1.1,c_lpad/artwork/artwork-light.jpg"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'pink' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'orange' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'grey' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'blue' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={7}>
                                        <Card>
                                            <CardBody className="custom-procut-image-card image-process-panel pb-3">
                                                <Row>
                                                    <Col md={2} className="p-0">
                                                        <h4 className="mb-4">{"Kids Tees"}</h4>
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
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-light/e_displace,x_15,y_15,l_adult-tees:Mens-Displacement-Set1/u_adult-tees:Mens-Gildan-64000-Set-1-WH,y_0/adult-tees/Mens-Gildan-64000-Set-1-WH"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'pink' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'orange' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'grey' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'blue' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={5} className="p-0">
                                                        <img
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-dark/e_displace,x_15,y_15,l_adult-tees:Mens-Displacement-Set1/u_adult-tees:Mens-Gildan-64000-Set-1-OR,y_0/adult-tees/Mens-Gildan-64000-Set-1-OR"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'pink' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'orange' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'grey' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'blue' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'orange' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md={5}>
                                        <Card>
                                            <CardBody className="custom-procut-image-card image-process-panel pb-3">
                                                <Row>
                                                    <Col md={5} className="p-0">
                                                        <div style={{ height: '92%' }}>
                                                            <h4 className="mb-4">{"Sticker"}</h4>
                                                            <div className="image-prview mb-4" />
                                                            <Button
                                                                type='button'
                                                                color='primary'
                                                                className="custom-upload-button"
                                                                size="sm"
                                                            >
                                                                {"Upload"}
                                                            </Button>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: "center" }} className="ml-3">
                                                            <Label className="custom-toggle">
                                                                <Input type="checkbox" defaultChecked={true} />
                                                                <span className="custom-toggle-slider rounded-circle" />
                                                            </Label>
                                                            <small className="ml-2">{"For Light"}</small>
                                                            <img
                                                                src={require(`assets/img/theme/color-wheel.png`)}
                                                                style={{ width: '12%', height: '12%' }}
                                                                className="ml-2"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={7} className="p-0">
                                                        <img
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/fetch/l_mugs:radial,e_displace,y_-6/l_mugs:mug-shape,g_center,fl_cutter/e_multiply,u_mugs:Mug-OR,x_100,y_-37,w_1000/l_mugs:mug-screen,e_screen,x_-100,y_37/https:/res.cloudinary.com/umbrellaink/image/upload/w_0.85,h_0.87/c_crop,c_fit,w_374/w_1.0,h_1.1,c_lpad/artwork/artwork-light.jpg"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'pink' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'yellow' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'grey' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'blue' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={7}>
                                        <Card>
                                            <CardBody className="custom-procut-image-card image-process-panel pb-3">
                                                <Row>
                                                    <Col md={2} className="p-0">
                                                        <h4 className="mb-4">{"Hoodies"}</h4>
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
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-light/e_displace,x_15,y_15,l_adult-tees:Mens-Displacement-Set1/u_adult-tees:Mens-Gildan-64000-Set-1-WH,y_0/adult-tees/Mens-Gildan-64000-Set-1-WH"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'pink' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'orange' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'grey' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'blue' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={5} className="p-0">
                                                        <img
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-dark/e_displace,x_15,y_15,l_adult-tees:Mens-Displacement-Set1/u_adult-tees:Mens-Gildan-64000-Set-1-OR,y_0/adult-tees/Mens-Gildan-64000-Set-1-OR"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'pink' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'orange' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'grey' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'blue' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'orange' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md={5}>
                                        <Card>
                                            <CardBody className="custom-procut-image-card image-process-panel pb-3">
                                                <Row>
                                                    <Col md={5} className="p-0">
                                                        <div style={{ height: '92%' }}>
                                                            <h4 className="mb-4">{"Stubbie Holders"}</h4>
                                                            <div className="image-prview mb-4" />
                                                            <Button
                                                                type='button'
                                                                color='primary'
                                                                className="custom-upload-button"
                                                                size="sm"
                                                            >
                                                                {"Upload"}
                                                            </Button>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: "center" }} className="ml-3">
                                                            <Label className="custom-toggle">
                                                                <Input type="checkbox" defaultChecked={true} />
                                                                <span className="custom-toggle-slider rounded-circle" />
                                                            </Label>
                                                            <small className="ml-2">{"For Light"}</small>
                                                            <img
                                                                src={require(`assets/img/theme/color-wheel.png`)}
                                                                style={{ width: '12%', height: '12%' }}
                                                                className="ml-2"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={7} className="p-0">
                                                        <img
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/fetch/l_mugs:radial,e_displace,y_-6/l_mugs:mug-shape,g_center,fl_cutter/e_multiply,u_mugs:Mug-OR,x_100,y_-37,w_1000/l_mugs:mug-screen,e_screen,x_-100,y_37/https:/res.cloudinary.com/umbrellaink/image/upload/w_0.85,h_0.87/c_crop,c_fit,w_374/w_1.0,h_1.1,c_lpad/artwork/artwork-light.jpg"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'pink' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'red' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'yellow' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'grey' }}
                                                                    />
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: 'blue' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={5} className="offset-1">
                                        <Card>
                                            <CardBody className="custom-procut-image-card image-process-panel pb-3">
                                                <Row>
                                                    <Col md={5} className="p-0">
                                                        <div style={{ height: '92%' }}>
                                                            <h4 className="mb-4">{"Tote Bags"}</h4>
                                                            <div className="image-prview mb-4" />
                                                            <Button
                                                                type='button'
                                                                color='primary'
                                                                className="custom-upload-button"
                                                                size="sm"
                                                            >
                                                                {"Upload"}
                                                            </Button>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: "center" }} className="ml-3">
                                                            <Label className="custom-toggle">
                                                                <Input type="checkbox" defaultChecked={true} />
                                                                <span className="custom-toggle-slider rounded-circle" />
                                                            </Label>
                                                            <small className="ml-2">{"For Light"}</small>
                                                            <img
                                                                src={require(`assets/img/theme/color-wheel.png`)}
                                                                style={{ width: '12%', height: '12%' }}
                                                                className="ml-2"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={7} className="p-0">
                                                        <img
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/fetch/l_mugs:radial,e_displace,y_-6/l_mugs:mug-shape,g_center,fl_cutter/e_multiply,u_mugs:Mug-OR,x_100,y_-37,w_1000/l_mugs:mug-screen,e_screen,x_-100,y_37/https:/res.cloudinary.com/umbrellaink/image/upload/w_0.85,h_0.87/c_crop,c_fit,w_374/w_1.0,h_1.1,c_lpad/artwork/artwork-light.jpg"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: '#fff' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col md={5}>
                                        <Card>
                                            <CardBody className="custom-procut-image-card image-process-panel pb-3">
                                                <Row>
                                                    <Col md={5} className="p-0">
                                                        <div style={{ height: '92%' }}>
                                                            <h4 className="mb-4">{"Wall Sticker"}</h4>
                                                            <div className="image-prview mb-4" />
                                                            <Button
                                                                type='button'
                                                                color='primary'
                                                                className="custom-upload-button"
                                                                size="sm"
                                                            >
                                                                {"Upload"}
                                                            </Button>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: "center" }} className="ml-3">
                                                            <Label className="custom-toggle">
                                                                <Input type="checkbox" defaultChecked={true} />
                                                                <span className="custom-toggle-slider rounded-circle" />
                                                            </Label>
                                                            <small className="ml-2">{"For Light"}</small>
                                                            <img
                                                                src={require(`assets/img/theme/color-wheel.png`)}
                                                                style={{ width: '12%', height: '12%' }}
                                                                className="ml-2"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={7} className="p-0">
                                                        <img
                                                            className="image-process mb-4"
                                                            src="https://res.cloudinary.com/umbrellaink/image/fetch/l_mugs:radial,e_displace,y_-6/l_mugs:mug-shape,g_center,fl_cutter/e_multiply,u_mugs:Mug-OR,x_100,y_-37,w_1000/l_mugs:mug-screen,e_screen,x_-100,y_37/https:/res.cloudinary.com/umbrellaink/image/upload/w_0.85,h_0.87/c_crop,c_fit,w_374/w_1.0,h_1.1,c_lpad/artwork/artwork-light.jpg"
                                                        />
                                                        <Row>
                                                            <Col
                                                                md={12}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <div className="custom-color-picker">
                                                                    <div
                                                                        className="custom-color-picker-item-two mr-1"
                                                                        style={{ backgroundColor: '#fff' }}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </LoadingOverlay>
                </Container>
            </>
        );
    }
}

const mapStateToProps = () => { };

export default connect(mapStateToProps, {})(ProductImage);