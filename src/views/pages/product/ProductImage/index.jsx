import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

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
import http from "../../../../helper/http";
import APP_CONST from "../../../../helper/constant";

function ProductImage(props) {
    const [source, setSource] = useState({});
    const [themeUrl, setThemeUrl] = useState({});
    const [imageUrl, setImageUrl] = useState({});
    const [skuNumber, setSkuNumber] = useState();

    const message = useSelector(
        state => { return state['product']['message'] },
        shallowEqual
    );

    useEffect(() => {
        let fetchUrl = `${APP_CONST.API_URL}/product/image/list`;
        http
            .get(fetchUrl)
            .then((response) => {
                setSource(response.data.data.imageList);
                setSkuNumber(response.data.data.skuNumber);
            })
            .catch((e) => {
                setSource({});
            });
    }, [])

    const handleUploadFile = (event, variant) => {
        event.preventDefault();
        const { id, name } = event.currentTarget;
        const number = Math.floor(100000 + Math.random() * 900000);

        window.cloudinary.openUploadWidget({
            cloud_name: 'umbrellaink',
            upload_preset: APP_CONST.UPLOAD_PRESET,
            tags: ['artwork'],
            public_id: `${id}_${number}`
        }, (err, res) => {
            if (!err && res && res.event === "success" && Object.keys(res.info).includes('secure_url')) {
                if (variant === 'master') {
                    setThemeUrl(prevState => ({ ...prevState, [name]: res.info.secure_url }))
                } else {
                    setImageUrl(prevState => ({
                        ...prevState, [variant]: {
                            ...prevState[variant],
                            [name]: res.info.secure_url
                        }
                    }));
                }
            }
        });
    }

    const handleRemoveFile = (event, variant) => {
        const { name } = event.target;

        setImageUrl(prevState => ({
            ...prevState, [variant]: {
                ...prevState[variant],
                [name]: null
            }
        }));
    }

    const handleSubmit = () => {

    }

    return (
        <>
            <MainHeader name='Product Image' parentName='Product' />
            <Container className='mt--6 product-image-container' fluid>
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
                            <Col md={6}>
                                <Card>
                                    <CardBody className="custom-product-image-card button-group-panel">
                                        <Button
                                            type='button'
                                            color='primary'
                                        >
                                            {"Original PDF"}
                                        </Button>
                                        <Button
                                            id={`${skuNumber}-artwork-light`}
                                            name="light"
                                            type='button'
                                            color='primary'
                                            onClick={(e) => handleUploadFile(e, 'master')}
                                        >
                                            {"For Light"}
                                        </Button>
                                        <Button
                                            id={`${skuNumber}-artwork-dark`}
                                            name="dark"
                                            type='button'
                                            color='primary'
                                            onClick={(e) => handleUploadFile(e, 'master')}
                                        >
                                            {"For Dark"}
                                        </Button>
                                        <Button
                                            type='button'
                                            color='warning'
                                            onClick={handleSubmit}
                                        >
                                            {"Create"}
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            {Object.keys(source).map(item => (
                                <React.Fragment key={item}>
                                    {source[item]['type'] === 2 &&
                                        <Col md={7}>
                                            <ImageDoubleItem
                                                source={source[item]}
                                                skuNumber={skuNumber}
                                                themeUrl={themeUrl}
                                                variant={item}
                                                imageUrl={
                                                    Object.keys(imageUrl).includes(item) ?
                                                        imageUrl[item] : null
                                                }
                                                onUploadFile={handleUploadFile}
                                                onRemoveFile={handleRemoveFile}
                                            />
                                        </Col>
                                    }
                                    {source[item]['type'] === 1 &&
                                        <Col md={5}>
                                            <ImageSingleItem source={source[item]} />
                                        </Col>
                                    }
                                </React.Fragment>
                            ))}
                        </Row>
                    </CardBody>
                </Card>


            </Container>
        </>
    );
}

export default ProductImage;