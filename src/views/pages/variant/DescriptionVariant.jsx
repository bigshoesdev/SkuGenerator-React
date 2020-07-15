import React from "react";
import { connect } from "react-redux";

import classnames from "classnames";
import NotificationAlert from "react-notification-alert";
import {
    Table,
    Button,
    Row,
    Col,
    Card,
    CardBody,
    Container,
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";

import {
    updateDescriptionVariant, getDescriptionVariant
} from "../../../store/actions/variant";

class DescriptionVariant extends React.Component {
    constructor(props) {
        super(props);
        this.refDescriptionVars = {};
        this.state = {
            data:
            {
                tshirts: '',
                stickers: '',
                mugs: '',
                toteBags: '',
                cushionCovers: '',
                kids: '',
                hoodies: '',
            },
            isEdit: {
                tshirts: false,
                stickers: false,
                mugs: false,
                toteBags: false,
                cushionCovers: false,
                kids: false,
                hoodies: false
            },
            data_th: [
                'Description',
            ],
        };
        this.props.getDescriptionVariant();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.description) {
            if (nextProps.description.length > 0) {
                let { data } = this.state;
                nextProps.description.map((description) => {
                    switch (description.master) {
                        case 'tshirts':
                            data.tshirts = description.description;
                            break;
                        case 'stickers':
                            data.stickers = description.description;
                            break;
                        case 'mugs':
                            data.mugs = description.description;
                            break;
                        case 'toteBags':
                            data.toteBags = description.description;
                            break;
                        case 'cushionCovers':
                            data.cushionCovers = description.description;
                            break;
                        case 'kids':
                            data.kids = description.description;
                            break;
                        case 'hoodies':
                            data.hoodies = description.description;
                            break;
                    }
                });
                this.setState({ data: data });
            }
        }

        if (nextProps.responseErrors) {
            this.showNotification(nextProps.responseErrors);
            this.props.getDescriptionVariant();
        }
    }

    Capitalize(str) {
        if (str == 'cushioncovers') {
            str = 'cushion Covers';
        } else if (str == 'totebags') {
            str = 'tote bags';
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    tableHeads(type) {
        let width;
        let columns = this.state.data_th.map((column, index) => {
            return (
                <th
                    scope="col"
                    className="text-center"
                    style={width}
                    key={index}
                >
                    {this.state.data_th[index]}
                </th>
            );
        }
        );
        return columns;
    }

    emitChange(e, type) {
        let { data } = this.state;
        data[type] = e.target.innerText;
    }

    dataList(type) {
        var self = this;
        return (
            <tr className="datalist-tr">
                <td className="text-center"
                    contentEditable={this.state.isEdit[type]}
                    onInput={e => this.emitChange(e, type)}
                    onBlur={e => this.emitChange(e, type)}
                    suppressContentEditableWarning={true}
                    style={{ height: '40px', border: this.state.isEdit[type] ? '2px solid' : '1px' }}>
                    {this.state.data[type]}
                </td>
            </tr>
        )
    }

    handleEdit(e, type) {
        let { isEdit } = this.state;
        isEdit[type] = !isEdit[type];
        this.setState({ isEdit: isEdit });
        if (!isEdit[type]) {
            this.props.updateDescriptionVariant({ master: type, description: this.state.data[type] });
        }
    }

    getbody() {
        var self = this;
        {
            var divTable = Object.keys(this.state.data).map(key => {
                return (
                    <Row key={key}>
                        <Col md={12} xl={12}>
                            <div className="div-tbl-description-variant">
                                <div className="div-tbl-title-imgVar">
                                    <Row>
                                        <Col style={{ tableLayout: 'fixed', width: "300px" }}>
                                            <h2>
                                                {this.Capitalize(key)}
                                            </h2>
                                        </Col>
                                        <Col>
                                            <Button size="sm" color="primary" onClick={e => self.handleEdit(e, key)}>
                                                <i className={classnames({ 'fas fa-pen': !self.state.isEdit[key], 'fas fa-save': self.state.isEdit[key] })} />
                                            </Button>
                                        </Col>
                                    </Row>

                                </div>
                                <div className="tbl-wrapper">
                                    <Table className="align-items-center" bordered responsive>
                                        <thead className="thead-light">
                                            <tr>{this.tableHeads(key)}</tr>
                                        </thead>
                                        <tbody>
                                            {this.dataList(key)}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>);
            })
        }
        return divTable;
    }

    showNotification = message => {
        let options = {
            place: "tr",
            message: (
                <div className="alert-text">
                    <span className="alert-title" data-notify="title" dangerouslySetInnerHTML={{ __html: message }}>
                    </span>
                </div>
            ),
            type: "error",
            icon: "ni ni-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };

    render() {
        return (
            <>
                <div className="rna-wrapper">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                <MainHeader name="Variant Description" parentName="Variant" />
                <Container className="mt--6 description-variant-container" fluid>
                    <Card style={{ minHeight: "700px" }}>
                        <CardBody>
                            {
                                this.getbody()
                            }
                        </CardBody>
                    </Card>
                </Container>
            </>
        );
    }
}

const mapStateToProps = ({ variant }) => ({
    description: variant.description,
    responseErrors: variant.errors,
    message: variant.message,
});

export default connect(mapStateToProps, {
    getDescriptionVariant,
    updateDescriptionVariant
})(DescriptionVariant);