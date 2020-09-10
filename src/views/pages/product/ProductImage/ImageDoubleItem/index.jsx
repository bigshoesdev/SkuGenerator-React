import React, { useState } from 'react';

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
                        <h4 className="mb-4">{props.source.title}</h4>
                        <div className="image-prview mb-4">
                            <img
                                className="image-upload"
                                src="https://res.cloudinary.com/umbrellaink/image/upload/v1599711850/artwork/artwork-dark-10.png"
                            />
                        </div>
                        <Button
                            name={`${props.skuNumber}-${props.source.masterType}-artwork-light-10`}
                            type='button'
                            color='primary'
                            className="custom-upload-button"
                            size="sm"
                            onClick={props.onUploadFile}
                        >
                            {"Upload"}
                        </Button>
                        <input
                            id={`${props.skuNumber}-${props.source.masterType}-artwork-light-10`}
                            type="file"
                            accept="*"
                            onChange={props.onUploadedFile}
                            style={{ display: 'none' }}
                        />
                    </Col>
                    {props.source.colorList.map(item => (
                        <Col md={5} className="p-0" key={item.themeType}>
                            <img
                                className="image-process mb-2"
                                src="https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-light/e_displace,x_15,y_15,l_adult-tees:TMP-DIS1-GSet1/u_adult-tees:TMP-GSet1-WH,y_0/adult-tees/TMP-GSet1-WH"
                            />
                            {item.value.map((el, idx) => (
                                <Row key={`${item.themeType}-${idx}`}>
                                    {item.value.length > 1 &&
                                        <>
                                            <Col
                                                md={4} style={{ textAlign: 'end' }}
                                                className="pr-0"
                                            >
                                                <h5 className="custom-color-picker-title m-0">
                                                    {el.gender.charAt(0).toUpperCase() + el.gender.slice(1)}
                                                </h5>
                                            </Col>
                                            <Col
                                                md={8}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <div className="custom-color-picker">
                                                    {el.value.map(color => (
                                                        <div
                                                            key={`${item.themeType}-${idx}=${color}`}
                                                            className="custom-color-picker-item-one mr-1"
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>
                                            </Col>
                                        </>
                                    }
                                    {item.value.length === 1 &&
                                        <Col
                                            md={12}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <div className="custom-color-picker mt-2">
                                                {el.value.map(color => (
                                                    <div
                                                        key={`${item.themeType}-${idx}=${color}`}
                                                        className="custom-color-picker-item-two mr-1"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </Col>
                                    }
                                </Row>
                            ))
                            }
                        </Col>
                    ))}
                    {/* "https://res.cloudinary.com/umbrellaink/image/upload/o_0/w_370,h_421,x_1,y_280,c_fit,g_north,l_artwork:artwork-dark/e_displace,x_15,y_15,l_adult-tees:TMP-DIS1-GSet1/u_adult-tees:TMP-GSet1-BK,y_0/adult-tees/TMP-GSet1-BK" */}
                </Row>
            </CardBody>
        </Card>
    );
}

export default ImageDoubleItem;