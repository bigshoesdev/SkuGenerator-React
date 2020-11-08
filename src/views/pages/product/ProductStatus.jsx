import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NotificationAlert from 'react-notification-alert';

import {
    Card,
    CardBody,
    Container,
    Collapse,
    Table,
} from 'reactstrap';

import MainHeader from '../../components/headers/MainHeader';
import http from "../../../helper/http";
import APP_CONST from "../../../helper/constant";


const STATUS = { 0: "New", 1: "Process", 2: "Failure", 3: "Success" }

function ProductStatus() {
    const [isOpen, setIsOpen] = useState({});
    const [source, setSource] = useState([]);
    const [fetchTime, setFetchTime] = useState(1000);
    const alertEl = useRef(null);

    const message = useSelector(
        state => { return state['product']['message'] },
        shallowEqual
    );

    const responseErrors = useSelector(
        state => { return state['product']['errors'] },
        shallowEqual
    );

    useEffect(() => {
        const interval = setInterval(() => {
            let fetchUrl = `${APP_CONST.API_URL}/marketplaces`;
            http
                .get(fetchUrl)
                .then((response) => {
                    setFetchTime(30000);
                    setSource(response.data);
                })
                .catch((e) => {
                    setSource([]);
                });
        }, fetchTime);
        return () => clearInterval(interval);
    }, [fetchTime]);

    useEffect(() => {
        if (message !== '') {
            showNotification(message);
        } else if (responseErrors !== '') {
            showNotification(responseErrors);
        }
    }, [message, responseErrors]);

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

    return (
        <>
            <div className='rna-wrapper'>
                <NotificationAlert ref={alertEl} />
            </div>
            <MainHeader name='Product Status' parentName='Product' />
            <Container className='mt--6 product-status-container' fluid>
                <Card style={{ minHeight: '700px' }}>
                    <CardBody>
                        <Table
                            className='align-items-center'
                            hover
                            bordered
                            responsive
                        >
                            <thead className='thead-light'>
                                <tr>
                                    <th scope='col' className='text-center'>{`No`}</th>
                                    <th>{`Status`}</th>
                                    <th>{`Product`}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {source.map((item, idx) => (
                                    <React.Fragment key={item.id}>
                                        <tr
                                            onClick={() => setIsOpen(prevState => ({
                                                ...prevState,
                                                [item.id]: Object.keys(isOpen).includes(item.id.toString()) ?
                                                    !isOpen[item.id] : true
                                            }))}
                                        >
                                            <td>{idx + 1}</td>
                                            <td>{`Success`}</td>
                                            <td>{item.product_title}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" style={{ padding: 0 }}>
                                                <Collapse
                                                    role="tabpanel"
                                                    isOpen={Object.keys(isOpen).includes(item.id.toString()) ? isOpen[item.id] : false}
                                                >
                                                    <Table responsive>
                                                        <thead>
                                                            <tr>
                                                                <th>{`Product Master SKU`}</th>
                                                                <th>{`Shopify`}</th>
                                                                <th>{`Etsy`}</th>
                                                                <th>{`eBay`}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {item.masters.map(master => (
                                                                <tr key={master.id}>
                                                                    <td>{master.sku_no}</td>
                                                                    {item.status.filter(el => el.master_id === master.id).map(el => (
                                                                        <td key={el.id}>{STATUS[el.status]}</td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Collapse>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default ProductStatus;