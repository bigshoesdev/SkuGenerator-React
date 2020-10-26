import React, { useState, useEffect } from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    Input,
    Label
} from 'reactstrap';

import APP_CONST from '../../../../../helper/constant';
import { baseName } from '../../../../../helper/util';

const INIT_IMAGE_URL = {
    light: null,
}

function ImageStickersItem(props) {
    const [preview, setPreview] = useState(INIT_IMAGE_URL);
    const preFile = `${props.skuNumber}-${props.variant}-artwork`;

    return (
        <Card>
            <CardBody className="custom-product-image-card image-process-panel pb-1">
                <Row>
                    <Col md={12} className="p-0">
                        <Row style={{ height: '2.5rem' }}>
                            <Col md={12}>
                                <h4 className="mb-4">{props.source.title}</h4>
                            </Col>
                        </Row>
                        <Row style={{justifyContent: 'center'}}>
                            <Col md={6} >
                                <img
                                    className="image-process mb-3"
                                // src="https://res.cloudinary.com/umbrellaink/image/fetch/l_mugs:radial,e_displace,y_-6/l_mugs:mug-shape,g_center,fl_cutter/e_multiply,u_mugs:Mug-OR,x_100,y_-37,w_1000/l_mugs:mug-screen,e_screen,x_-100,y_37/https:/res.cloudinary.com/umbrellaink/image/upload/w_0.85,h_0.87/c_crop,c_fit,w_374/w_1.0,h_1.1,c_lpad/artwork/artwork-light.jpg"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card >
    );
}

export default ImageStickersItem;