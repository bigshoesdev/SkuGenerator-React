import React, { useState, useEffect, useRef } from 'react';
import classnames from "classnames";

import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Pagination,
    PaginationItem,
    PaginationLink,
    CardFooter,
    Row,
    Col,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
} from 'reactstrap';

import MainHeader from '../../../components/headers/MainHeader';
import http from '../../../../helper/http';
import APP_CONST from '../../../../helper/constant';


const INIT_ENTITIES = {
    data: [],
    page: 1,
    last_page: 1,
    per_page: 20,
    total: 1,
};

const INIT_PAGINATION = {
    sortedColumn: 'updated_at',
    order: 'desc'
};

const COLUMNS = [
    { id: 'id', name: 'no', width: '5%' },
    { id: 'sku', name: 'sku', width: '20%' },
    { id: 'qty', name: 'quantity', width: '10%' },
    { id: 'total_qty', name: 'total quantity', width: '10%' },
    { id: 'currency', name: 'currency', width: '10%' },
    { id: 'shipping_carrier', name: 'shipping carrier', width: '10%' },
    { id: 'shipping_id', name: 'Shipping id', width: '10%' },
    { id: 'paid_time', name: 'paid time', width: '10%' },
    { id: 'shipped_time', name: 'shipped time', width: '10%' },
];

function OrderReport() {
    const [page, setPage] = useState(1);
    const [entities, setEntities] = useState(INIT_ENTITIES);
    const [pagination, setPagination] = useState(INIT_PAGINATION);
    const [searchKey, setSearchKey] = useState("");
    const alertEl = useRef();
    const offset = 5;

    useEffect(() => {
        fetchEntities();
    }, [page, searchKey]);

    const fetchEntities = () => {
        let fetchUrl = `${APP_CONST.API_URL}/sales/report/?&page=${page}&column=${pagination.sortedColumn}&order=${pagination.order}&per_page=${entities.per_page}&search_key=${searchKey}`;
        http
            .get(fetchUrl)
            .then((res) => {
                setEntities(res.data.data);
            })
            .catch((e) => {
                setEntities(INIT_ENTITIES);
            });
    }

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

    const sortByColumn = (column) => {
        column === pagination.sortedColumn ?
            pagination.order === 'desc' ?
                setPagination(prevState => ({ ...prevState, order: 'asc' })) :
                setPagination(prevState => ({ ...prevState, order: 'desc' })) :
            setPagination({ sortedColumn: column, order: 'asc' });

        setPage(1);
        fetchEntities();
    };
    
    return (
        <>
            <MainHeader name='Customer' parentName='Sales Management' />
            <Container className='mt--6 customer-container' fluid>
                <Card className="p-3">
                    <CardHeader>
                        <Row>
                            <Col md={4}><h1>{`Sales Report`}</h1></Col>
                            <Col className="offset-4 pb-2">
                                <div className="div-searchbar-createkeyword">
                                    <FormGroup className="mb-0 rounded">
                                        <InputGroup className="input-group-alternative input-group-merge">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-search" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Search"
                                                type="text"
                                                name="searchKey"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        setSearchKey(e.target.value);
                                                        setPage(1);
                                                    }
                                                }}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
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
                                            onClick={() => sortByColumn(item.id)}
                                        >
                                            {item.name}
                                            {item.id === pagination.sortedColumn ?
                                                pagination.order === 'asc' ?
                                                    <i className='fa fa-sort-alpha-down' /> : <i className='fa fa-sort-alpha-up' />
                                                : null}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {entities.data.map((item, idx) => (
                                    <tr key={item.id}>
                                        <td>{idx + 1}</td>
                                        <td>{item.sku}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.total_qty}</td>
                                        <td>{item.currency}</td>
                                        <td>{item.shipping_carrier}</td>
                                        <td>{item.shipping_id}</td>
                                        <td>{item.paid_time}</td>
                                        <td>{item.shipped_time}</td>
                                    </tr>
                                ))}
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
                                        <span className="sr-only">{`Next`}</span>
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

export default OrderReport;