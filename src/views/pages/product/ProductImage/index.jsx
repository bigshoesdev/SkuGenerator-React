import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import NotificationAlert from "react-notification-alert";

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
import { uploadProductImage } from '../../../../store/actions/product';


function ProductImage() {
    const [source, setSource] = useState({});
    const [skuNumber, setSkuNumber] = useState();
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();


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
                setSkuNumber(response.data.data.skuNo);
            })
            .catch((e) => {
                setSource({});
            });
    }, [])

    useEffect(() => {
        if (message !== '')
            setIsActive(false);
    }, [message])

    const handleUploadFile = (event) => {
        event.preventDefault();
        const { name } = event.currentTarget;

        const artworkFile = document.getElementById(name);
        artworkFile.click();
    }

    const handleUploadedFile = (event) => {
        event.preventDefault();
        const { id } = event.target;
        const artworkFile = document.getElementById(id);
        let reader = new FileReader();
        let file;

        reader.onloadend = function () {
            file = reader.result;
            dispatch(uploadProductImage({ id, file }));
        }

        reader.readAsDataURL(artworkFile.files[0]);
        setIsActive(true);
    }

    return (
        <>
            <MainHeader name='Product Image' parentName='Product' />
            <Container className='mt--6 product-image-container' fluid>
                <LoadingOverlay
                    active={isActive}
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
                                                name={`${skuNumber}-artwork-light`}
                                                type='button'
                                                color='primary'
                                                onClick={handleUploadFile}
                                            >
                                                {"For Light"}
                                            </Button>
                                            <input
                                                id={`${skuNumber}-artwork-light`}
                                                type="file"
                                                accept="*"
                                                onChange={handleUploadedFile}
                                                style={{ display: 'none' }}
                                            />
                                            <Button
                                                name={`${skuNumber}-artwork-dark`}
                                                type='button'
                                                color='primary'
                                                onClick={handleUploadFile}
                                            >
                                                {"For Dark"}
                                            </Button>
                                            <input
                                                id={`${skuNumber}-artwork-dark`}
                                                type="file"
                                                accept="*"
                                                onChange={handleUploadedFile}
                                                style={{ display: 'none' }}
                                            />
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
                                                    onUploadedFile={handleUploadedFile}
                                                    onUploadFile={handleUploadFile}
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
                </LoadingOverlay>
            </Container>
        </>
    );
}

export default ProductImage;