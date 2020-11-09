import React, { useState, useEffect, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import classnames from "classnames";
import NotificationAlert from 'react-notification-alert';

import {
    Card,
    CardBody,
    CardFooter,
    Container,
    Collapse,
    Button,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';

import MainHeader from '../../components/headers/MainHeader';
import http from "../../../helper/http";
import APP_CONST from "../../../helper/constant";


const STATUS = {
    0: "New",
    1: "Process",
    2: "Failure",
    3: "Success"
};

const INIT_ENTITIES = {
    data: [],
    page: 1,
    last_page: 1,
    per_page: 20,
    total: 1,
};

const COLUMNS = [
    { name: 'no', width: '5%' },
    { name: 'title', width: '20%' },
    { name: 'sku', width: '10%' },
    { name: 'status', width: '10%' },
];

function ProductStatus() {
    const [page, setPage] = useState(1);
    const [entities, setEntities] = useState(INIT_ENTITIES);
    const [searchKey, setSearchKey] = useState("");
    const [isOpen, setIsOpen] = useState({});
    const [isOpenError, setIsOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [sortedColumn, setSortedColumn] = useState('updated_at');
    const [order, setOrder] = useState('desc');
    const alertEl = useRef(null);
    const offset = 5;

    const message = useSelector(
        state => { return state['product']['message'] },
        shallowEqual
    );

    const responseErrors = useSelector(
        state => { return state['product']['errors'] },
        shallowEqual
    );

    useEffect(() => {
        if (entities.data.length > 0) {
            const interval = setInterval(() => {
                fetchEntities();
            }, 120000);
            return () => clearInterval(interval);
        } else {
            fetchEntities()
        }
    }, [entities]);

    useEffect(() => {
        if (message !== '') {
            showNotification(message);
        } else if (responseErrors !== '') {
            showNotification(responseErrors);
        }
    }, [message, responseErrors]);

    const fetchEntities = () => {
        let fetchUrl = `${APP_CONST.API_URL}/marketplaces/?&page=${page}&column=${sortedColumn}&order=${order}&per_page=${entities.per_page}&search_key=${searchKey}`;
        http
            .get(fetchUrl)
            .then((response) => {
                setEntities(response.data.data);
            })
            .catch((e) => {
                setEntities(INIT_ENTITIES);
            });
    };

    const pagesNumbers = () => {
        if (!entities.to) {
            return [];
        }

        let from = entities.current_page - offset >= 1 ? entities.current_page - offset : 1;
        let to = from + offset * 2 - 1;
        let pagesArray = [];

        if (to >= entities.last_page) {
            to = entities.last_page;
            from = entities.last_page - offset * 2 >= 1 ? entities.last_page - offset * 2 : 1;
        }

        for (let page = from; page <= to; page++) {
            pagesArray.push(page);
        }

        return pagesArray;
    }

    const sortByColumn = () => { };

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
                    <Modal
                        isOpen={isOpenError}
                        toggle={() => setIsOpenError(!isOpenError)}
                    >
                        <ModalHeader>{`Error Log`}</ModalHeader>
                        <ModalBody>
                            {errorMessage.split(",").join(", ")}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                type="button"
                                onClick={() => setIsOpenError(!isOpenError)}
                            >
                                {`Confirm`}
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <CardBody>
                        <div className="collapse-table">
                            <Table
                                hover
                                bordered
                                responsive
                                className='align-items-center text-center'
                            >
                                <thead className='thead-light'>
                                    <tr>
                                        {COLUMNS.map(item => (
                                            <th
                                                key={item.name}
                                                scope='col'
                                                className='text-center'
                                                style={{ width: item.width }}
                                                onClick={
                                                    item.name = "sku" || item.name === "status" ?
                                                        () => sortByColumn(item) : undefined
                                                }
                                            >
                                                {item.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {entities.data.map((item, idx) => {
                                        let total = { status: null, color: '#FFF' };

                                        if (item.status.some(el => el.status === 3) &&
                                            item.status.every(el => el.status === 3 || el.status === 0)
                                        ) {
                                            total.status = 'Success'
                                            total.color = '#5bd75b';
                                        } else if (item.status.some(el => el.status === 2)) {
                                            total.status = 'Failure'
                                            total.color = '#ff6666';
                                        } else if (item.status.some(el => el.status === 0 || el.status === 1)) {
                                            total.status = 'Process'
                                            total.color = '#66ccff';
                                        }

                                        return (
                                            <React.Fragment key={item.id}>
                                                <tr
                                                    onClick={() => setIsOpen(prevState => ({
                                                        ...prevState,
                                                        [item.id]: Object.keys(isOpen).includes(item.id.toString()) ?
                                                            !isOpen[item.id] : true
                                                    }))}
                                                    style={{
                                                        backgroundColor: Object.keys(isOpen).includes(item.id.toString()) && isOpen[item.id] ?
                                                            '#66ccff' : '#FFF'
                                                    }}
                                                >
                                                    <td>{idx + 1}</td>
                                                    <td>{item.product_title}</td>
                                                    <td>{item.product_no}</td>
                                                    <td style={{ backgroundColor: total.color, color: "#fff" }}>{total.status}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" style={{ padding: 0 }}>
                                                        <Collapse
                                                            role="tabpanel"
                                                            isOpen={Object.keys(isOpen).includes(item.id.toString()) ? isOpen[item.id] : false}
                                                        >
                                                            <Table
                                                                hover
                                                                bordered
                                                                responsive
                                                                className='align-items-center text-center'
                                                            >
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
                                                                                <React.Fragment key={el.id}>
                                                                                    <td
                                                                                        id={el.id}
                                                                                        onClick={
                                                                                            el.status === 2 ? () => {
                                                                                                setIsOpenError(!isOpenError);
                                                                                                setErrorMessage(el.error_log);
                                                                                            } : undefined
                                                                                        }
                                                                                        style={
                                                                                            el.status === 2 ?
                                                                                                { backgroundColor: '#ff6666', color: '#fff' } :
                                                                                                el.status === 3 ?
                                                                                                    { backgroundColor: '#5bd75b', color: '#fff' } :
                                                                                                    el.status === 1 ?
                                                                                                        { backgroundColor: '#66ccff', color: '#fff' } :
                                                                                                        { backgroundColor: '#fff' }

                                                                                        }
                                                                                    >
                                                                                        {STATUS[el.status]}
                                                                                    </td>
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </Collapse>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}
                                    {!entities.data.length &&
                                        <tr>
                                            <td
                                                colSpan={COLUMNS.length + 1}
                                                className="text-center td-noredords"
                                            >
                                                {"No Records Found."}
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                    <CardFooter className="py-4">
                        <nav aria-label="...">
                            <Pagination
                                className="pagination justify-content-end mb-0"
                                listClassName="justify-content-end mb-0"
                            >
                                <PaginationItem
                                    className={classnames({
                                        disabled: 1 == entities.page,
                                    })}
                                >
                                    <PaginationLink
                                        onClick={() => setPage(entities.page - 1)}
                                    >
                                        <i className="fas fa-angle-left" />
                                        <span className="sr-only">{"Previous"}</span>
                                    </PaginationLink>
                                </PaginationItem>
                                {pagesNumbers().map((page) =>
                                    (
                                        <PaginationItem
                                            className={classnames({
                                                active: page === entities.page,
                                            })}
                                            key={"pagination-" + page}
                                        >
                                            <PaginationLink onClick={() => setPage(page)}>
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                <PaginationItem
                                    className={classnames({
                                        disabled:
                                            entities.last_page === entities.page
                                    })}
                                >
                                    <PaginationLink
                                        onClick={() => setPage(entities.page + 1)}
                                    >
                                        <i className="fas fa-angle-right" />
                                        <span className="sr-only">Next</span>
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </nav>
                    </CardFooter>
                </Card>
            </Container>
        </>
    );
}

export default ProductStatus;