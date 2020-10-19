import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NotificationAlert from 'react-notification-alert';
import { v4 as uuidv4 } from 'uuid';

import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
} from 'reactstrap';

import ImageThemeDoubleItem from './ImageThemeDoubleItem';
import ImageThemeSingleItem from './ImageThemeSingleItem';
import ImageSideDoubleItem from './ImageSideDoubleItem';
import http from "../../../../helper/http";
import APP_CONST from "../../../../helper/constant";
import { baseName } from '../../../../helper/util';
import { createProductImages } from '../../../../store/actions/product';


const themes = ['light', 'dark'];
const sides = ['front', 'back'];

function ProductImage(props) {
    const [source, setSource] = useState({});
    const [themeUrl, setThemeUrl] = useState({});
    const [imageUrl, setImageUrl] = useState({});
    const [skuNumber, setSkuNumber] = useState();
    const [checkedList, setCheckedList] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const alertEl = useRef(null);
    const dispatch = useDispatch();

    const message = useSelector(
        state => { return state['product']['message'] },
        shallowEqual
    );

    const responseErrors = useSelector(
        state => { return state['product']['errors'] },
        shallowEqual
    );

    const product = useSelector(
        state => { return state['product']['payload'] },
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
    }, []);

    useEffect(() => {
        const isDisabledSubmit = Object.keys(themeUrl).length === 2 &&
            Object.values(themeUrl).every(el => Boolean(el)) ? false : true;
        setIsDisabled(isDisabledSubmit);
    }, [themeUrl]);

    useEffect(() => {
        if (props.isSubmit) {
            let data = {};
            let printUrls = {};

            Object.keys(source).map(item => {
                let master = source[item]['type'];

                source[item].colorList.map(el => {
                    if (master === 2) {
                        themes.map(theme => {
                            if (theme.charAt(0) === el.theme.toLowerCase()) {
                                let artwork = baseName(imageUrl[item][theme]);
                                el.url = el.url.replace("[$artwork]", artwork);
                            }
                        });
                    } else if (master === 3) {
                        el.front_url = el.front_url.replace("[$artwork]", baseName(imageUrl[item]['front']));
                        el.back_url = el.back_url.replace("[$artwork]", baseName(imageUrl[item]['back']));
                    }
                });

                source[item].printUrls.map(el => {
                    if (master === 2) {
                        themes.map(theme => {
                            if (theme.charAt(0) === el.theme.toLowerCase()) {
                                let artwork = baseName(imageUrl[item][theme]);
                                el.printUrl = el.printUrl.replace("[$artwork]", artwork);
                            }
                        });
                    } else if (master === 3) {
                        el.printUrl = el.printUrl.replace("[$artwork-front]", baseName(imageUrl[item]['front']));
                        el.printUrl = el.printUrl.replace("[$artwork-back]", baseName(imageUrl[item]['back']));
                    }
                });

                data[item] = source[item].colorList;
                printUrls[item] = source[item].printUrls;
            });
            props.onUpload(data, imageUrl);
            dispatch(createProductImages({ id: product.id, data, printUrls }));
        }
    }, [props.isSubmit]);

    useEffect(() => {
        if (message !== '') {
            props.onSubmit(false);
            showNotification(message);

            if (message.includes('Images')) {
                props.onIsUploadPanel();
            }
        } else if (responseErrors !== '') {
            props.onSubmit(false);
            showNotification(responseErrors);
        }
    }, [message, responseErrors])

    const showNotification = (message) => {
        let options = {
            place: 'tr',
            message: (
                <div className='alert-text'>
                    <span
                        className='alert-title'
                        data-notify='title'
                        dangerouslySetInnerHTML={{ __html: message }}
                    ></span>
                </div>
            ),
            type: 'success',
            icon: 'ni ni-bell-55',
            autoDismiss: 7,
        };
        alertEl.current.notificationAlert(options);
    }

    const handleUploadFile = (event, variant) => {
        event.preventDefault();
        const { id, name } = event.currentTarget;

        window.cloudinary.openUploadWidget({
            cloud_name: APP_CONST.CLOUD_NAME,
            upload_preset: APP_CONST.UPLOAD_PRESET,
            tags: ['artwork'],
            public_id: `${id}_${uuidv4()}`
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
        Object.keys(source).map(item => {
            let master = source[item]['type'];

            if (Object.keys(imageUrl).includes(item)) {
                if (master === 2) {
                    themes.map(el => {
                        if (!Object.keys(imageUrl[item]).includes(el)) {
                            setImageUrl(prevState => ({
                                ...prevState, [item]: {
                                    ...prevState[item], [el]: themeUrl[el]
                                }
                            }));
                        }
                    });
                } else if (master === 3) {
                    let theme = checkedList[item] ? 'light' : 'dark';
                    sides.map(el => {
                        if (!Object.keys(imageUrl[item]).includes(el)) {
                            setImageUrl(prevState => ({
                                ...prevState, [item]: {
                                    ...prevState[item], [el]: themeUrl[theme]
                                }
                            }));
                        }
                    });
                }
            } else {
                if (master === 2) {
                    themes.map(el => {
                        setImageUrl(prevState => ({
                            ...prevState, [item]: {
                                ...prevState[item], [el]: themeUrl[el]
                            }
                        }));
                    });
                } else if (master === 3) {
                    let theme = checkedList[item] ? 'light' : 'dark';
                    sides.map(el => {
                        setImageUrl(prevState => ({
                            ...prevState, [item]: {
                                ...prevState[item], [el]: themeUrl[theme]
                            }
                        }));
                    });
                }
            }
        });
        props.onSubmit(true);
        props.onCheckIsSubmit();
    }

    return (
        <Card style={{ minHeight: '700px' }}>
            <div className='rna-wrapper'>
                <NotificationAlert ref={alertEl} />
            </div>
            <CardBody className="pl-6 pr-6">
                <Row>
                    <Col md={8}>
                        <h4 className='display-4 ml-3 mb-3'>
                            {"Product Image"}
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
                                    disabled={isDisabled}
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
                            {source[item].type === 2 &&
                                <Col md={7}>
                                    <ImageThemeDoubleItem
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
                            {source[item].type === 1 &&
                                <Col md={5}>
                                    <ImageThemeSingleItem source={source[item]} />
                                </Col>
                            }
                            {source[item].type === 3 &&
                                <Col md={7}>
                                    <ImageSideDoubleItem
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
                                        onChecked={(value) => setCheckedList(prevState => ({ ...prevState, [item]: value }))}
                                    />
                                </Col>
                            }
                        </React.Fragment>
                    ))}
                </Row>
            </CardBody>
        </Card>
    );
}

export default ProductImage;