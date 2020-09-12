import React, { useState } from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
} from 'reactstrap';

import APP_CONST from '../../../../../helper/constant';

const INIT_IMAGE_URL = {
    dark: null,
    light: null
}

function ImageDoubleItem(props) {
    const [preview, setPreview] = useState(INIT_IMAGE_URL);
    const preFile = `${props.skuNumber}-${props.variant}-artwork`;

    const handlePreview = (event, url) => {
        const name = event.target.getAttribute('name')

        if (url) {
            let artworkFile = props.imageUrl && Object.keys(props.imageUrl).includes(name) ?
                props.imageUrl[name].split('/')[props.imageUrl[name].split('/').length - 1].slice(0, -4) :
                Object.keys(props.themeUrl).includes(name) ?
                    props.themeUrl[name].split('/')[props.themeUrl[name].split('/').length - 1].slice(0, -4) : null;

            url = url.replace("[$artwork]", artworkFile);
            setPreview(prevState => ({ ...prevState, [name]: url }))
        }
    }

    return (
        <Card>
            <CardBody className="custom-procut-image-card image-process-panel pb-1">
                <Row>
                    <Col md={2} className="p-0">
                        <h4 className="mb-4">{props.source.title}</h4>
                        <img
                            className="image-prview mb-4"
                            src={(props.imageUrl && Object.keys(props.imageUrl).includes('light')) ? props.imageUrl.light : null}
                        />
                        <Button
                            id={`${preFile}-light`}
                            name="light"
                            type='button'
                            color='primary'
                            className="custom-upload-button"
                            size="sm"
                            onClick={(e) => props.onUploadFile(e, props.variant)}
                        >
                            {"Upload Light"}
                        </Button>
                    </Col>
                    <Col md={2} className="p-0">
                        <img
                            className="image-prview mb-4"
                            style={{ marginTop: '6.2vh' }}
                            src={(props.imageUrl && Object.keys(props.imageUrl).includes('dark')) ? props.imageUrl.dark : null}
                        />
                        <Button
                            id={`${preFile}-dark`}
                            name="dark"
                            type='button'
                            color='primary'
                            className="custom-upload-button"
                            size="sm"
                            onClick={(e) => props.onUploadFile(e, props.variant)}
                        >
                            {"Upload Dark"}
                        </Button>
                    </Col>
                    {Array(props.source.type).fill(null).map((value, index) => (
                        <Col md={4} className="p-0" key={`${props.variant}-${index}`}>
                            <img
                                className="image-process mb-2"
                                src={APP_CONST.THEME[index] === 'D' ? preview.dark : preview.light}
                            />
                            {Array(props.source.gender).fill(null).map((val, idx) => (
                                <Row key={`${props.variant}-${index}-${idx}`}>
                                    <Col
                                        md={4} style={{ textAlign: 'end' }}
                                        className="pr-0"
                                    >
                                        <h5 className="custom-color-picker-title m-0">
                                            {APP_CONST.GENDER_LIST[idx].name}
                                        </h5>
                                    </Col>
                                    <Col
                                        md={8}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <div className="custom-color-picker">
                                            {props.source.colorList.map(color => {
                                                if (color.theme === APP_CONST.THEME[index]
                                                    && (color.gender === '' || color.gender === APP_CONST.GENDER_LIST[idx].key)) {
                                                    return (
                                                        <div
                                                            key={`${color.key}-${idx}`}
                                                            name={color.theme === 'D' ? 'dark' : 'light'}
                                                            className="custom-color-picker-item-one mr-1"
                                                            style={{ backgroundColor: APP_CONST.COLOR_LIST[color.key] }}
                                                            onClick={(e) => handlePreview(e, color.url)}
                                                        />
                                                    )
                                                }
                                            })}
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    ))}
                    {/* "https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-dark/e_displace,x_15,y_15,l_adult-tees:TMP-DIS1-GSet1/u_adult-tees:TMP-GSet1-BK,y_0/adult-tees/TMP-GSet1-BK" */}
                </Row>
            </CardBody>
        </Card>
    );
}

export default ImageDoubleItem;