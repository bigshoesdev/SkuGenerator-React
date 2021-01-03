import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NotificationAlert from 'react-notification-alert';

import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Table,
} from 'reactstrap';

import MainHeader from '../../../components/headers/MainHeader';
import http from '../../../../helper/http';
import APP_CONST from '../../../../helper/constant';
import { getName } from '../../../../helper/util';

function StockReOrder() {
    const [source, setSource] = useState({});
    const [selected, setSelected] = useState("tshirts");
    const [gender, setGender] = useState("M");
    const [masters, setMasters] = useState([]);
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
        let fetchUrl = `${APP_CONST.API_URL}/product/get-master-types`;
        http
            .get(fetchUrl)
            .then((res) => setMasters(res.data.data))
            .catch((e) => setMasters([]));
    }, [])

    useEffect(() => {
        if (selected !== "") {
            let fetchUrl = `${APP_CONST.API_URL}/product/order/get-reorder?master=${selected}&gender=${gender}`;
            http
                .get(fetchUrl)
                .then((res) => {
                    setSource(res.data.data);
                })
                .catch((e) => {
                    setSource({});
                });
        }
    }, [selected, gender]);

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
            <MainHeader name='Stock on Hand' parentName='Stock Management' />
            <Container className='mt--6 stock-on-hand-container' fluid>
               <Card className="p-3">
                    <CardHeader>
                        <h1>{`Stock Re-Order`}</h1>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={2} xl={2}>
                                <UncontrolledDropdown>
                                    <DropdownToggle color='primary' style={{ minWidth: '10rem' }}>
                                        {selected !== '' ?
                                            selected === 'tshirts' ?
                                                gender === 'M' ?
                                                    `Mens ${getName(selected)}` : `Womens ${getName(selected)}` :
                                                getName(selected) :
                                            'Please Select ...'
                                        }
                                    </DropdownToggle>
                                    <DropdownMenu className='dropdown-menu-arrow'>
                                        {masters.length === 0 &&
                                            <DropdownItem>
                                                {"No Options Found"}
                                            </DropdownItem>}
                                        {masters.length > 0 && masters.filter(item => item.is_variant !== 0)
                                            .map(item => (
                                                <React.Fragment key={item.name}>
                                                    {item.gender === 0 &&
                                                        <DropdownItem
                                                            onClick={() => {
                                                                setSelected(item.name);
                                                                setGender('');
                                                            }}
                                                        >
                                                            {item.value.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')}
                                                        </DropdownItem>}
                                                    {item.gender > 0 && Array(item.gender).fill(null).map((el, idx) => (
                                                        <DropdownItem
                                                            key={`${item.value}-${idx}`}
                                                            onClick={() => {
                                                                setSelected(item.name);
                                                                setGender(APP_CONST.GENDER_LIST[idx].key);
                                                            }}
                                                        >
                                                            {`${APP_CONST.GENDER_LIST[idx].name} ${item.value.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')}`}
                                                        </DropdownItem>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            <Col key={`tbl-${selected}-${gender}`} md={12} xl={12} className="mt-4">
                                <Table
                                    hover
                                    bordered
                                    responsive
                                    className='align-items-center text-center'
                                >
                                    {Object.keys(source).length > 0 &&
                                        <>
                                            <thead className='thead-light'>
                                                <tr>
                                                    <th style={{ width: '15%' }}>{`Colour`}</th>
                                                    {source.sizes.map(size => (
                                                        <th key={size.name}>{size.name}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {source.colors.filter(color => gender !== '' ? !APP_CONST.BAN_COLORS[gender].includes(color.key) : color)
                                                    .map(color => (
                                                        <tr key={color.key}>
                                                            <td>{color.name}</td>
                                                            {source.data.map(item => {
                                                                return source.sizes.map(size => {
                                                                    if (item.color === color.key &&
                                                                        item.size === size.key &&
                                                                        item.gender === gender
                                                                    ) {
                                                                        return (
                                                                            <td
                                                                                key={item.id}
                                                                                id={item.id}
                                                                                className='text-center'
                                                                            >
                                                                                {item.qty < 0 ? item.qty : 0}
                                                                            </td>
                                                                        );
                                                                    }
                                                                })
                                                            })}
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </>
                                    }
                                    {Object.keys(source).length === 0 &&
                                        <>
                                            <thead className='thead-light'>
                                                <tr><th>{"No Size"}</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center td-noredords">{"No Records Found."}</td>
                                                </tr>
                                            </tbody>
                                        </>
                                    }
                                </Table>
                            </Col>
                        </Row>

                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default StockReOrder; 