import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NotificationAlert from 'react-notification-alert';

import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Collapse,
    
} from 'reactstrap';

import MainHeader from '../../../components/headers/MainHeader';


function Marketplaces() {
    const [isOpen, setIsOpen] = useState(false);
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
            <MainHeader name='Marketplaces' />
            <Container className='mt--6 marketplaces-container' fluid>
                <Card style={{ minHeight: '700px' }}>
                    <CardBody>
                        <Card className="card-plain">
                            <CardHeader
                                role="tab"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-expanded={isOpen}
                            >
                                <h5 className="mb-0">Collapsible Group Item #1</h5>
                            </CardHeader>
                            <Collapse
                                role="tabpanel"
                                isOpen={isOpen}
                            >
                                <CardBody>
                                    {`Anim pariatur cliche reprehenderit, enim eiusmod high life
                                    accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa
                                    nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                    aliqua put a bird on it squid single-origin coffee nulla
                                    assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                                    beer labore wes anderson cred nesciunt sapiente ea proident.
                                    Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                    beer farm-to-table, raw denim aesthetic synth nesciunt you
                                    probably haven't heard of them accusamus labore sustainable
                                    VHS.`}
                                </CardBody>
                            </Collapse>
                        </Card>
                        <Card className="card-plain">
                            <CardHeader
                                role="tab"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-expanded={isOpen}
                            >
                                <h5 className="mb-0">Collapsible Group Item #2</h5>
                            </CardHeader>
                            <Collapse
                                role="tabpanel"
                                isOpen={isOpen}
                            >
                                <CardBody>
                                    {`Anim pariatur cliche reprehenderit, enim eiusmod high life
                                    accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa
                                    nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                    aliqua put a bird on it squid single-origin coffee nulla
                                    assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                                    beer labore wes anderson cred nesciunt sapiente ea proident.
                                    Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                    beer farm-to-table, raw denim aesthetic synth nesciunt you
                                    probably haven't heard of them accusamus labore sustainable
                                    VHS.`}
                                </CardBody>
                            </Collapse>
                        </Card>
                        <Card className="card-plain">
                            <CardHeader
                                role="tab"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-expanded={isOpen}
                            >
                                <h5 className="mb-0">Collapsible Group Item #3</h5>
                            </CardHeader>
                            <Collapse
                                role="tabpanel"
                                isOpen={isOpen}
                            >
                                <CardBody>
                                    {`Anim pariatur cliche reprehenderit, enim eiusmod high life
                                    accusamus terry richardson ad squid. 3 wolf moon officia aute,
                                    non cupidatat skateboard dolor brunch. Food truck quinoa
                                    nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                    aliqua put a bird on it squid single-origin coffee nulla
                                    assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                                    beer labore wes anderson cred nesciunt sapiente ea proident.
                                    Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                    beer farm-to-table, raw denim aesthetic synth nesciunt you
                                    probably haven't heard of them accusamus labore sustainable
                                    VHS.`}
                                </CardBody>
                            </Collapse>
                        </Card>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default Marketplaces;