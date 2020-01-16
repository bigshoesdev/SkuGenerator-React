import React from "react";
import { Link } from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classnames from "classnames";
import { connect } from "react-redux";
import NotificationAlert from "react-notification-alert";
import LoadingOverlay from 'react-loading-overlay';
import {
    Button,
    Card,
    CardBody,
    Container,
    Row,
    Col,
    FormGroup,
    Input,
    Label,
    Form
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";
import { allCategories } from "../../../store/actions/category";
import { allKeywords } from "../../../store/actions/keyword";
import {
    createProduct, allProductInfo
} from "../../../store/actions/product";

class ProductCreate extends React.Component {
    state = {
        messsge: [],
        artist_list: [],
        printMode_list: [],
        stickerType_list: [],
        price_tshirt: [],
        price_sticker: [],
        price_mug: [],
        price_totebag: [],
        price_cushioncover: [],
        price_hoody: [],
        price_kid: [],
        product_image: [],
        product: {
            product_title: "",
            tshirt_printmode: "",
            tshirt_image: "",
            p_tshirt: '',
            stickers_width: "",
            stickers_height: "",
            stickers_type: "",
            p_sticker: "",
            artist: "",
            p_mug: "",
            p_totebag: "",
            p_cushioncover: "",
            p_hoody: "",
            p_kid: "",
            category: 0,
            keyword: 0,
        },
        product_title: "",
        tshirt_printmode: "",
        tshirt_image: "",
        p_tshirt: '',
        stickers_width: "",
        stickers_height: "",
        stickers_type: "",
        p_sticker: "",
        artist: "",
        p_mug: "",
        p_totebag: "",
        p_cushioncover: "",
        p_hoody: "",
        p_kid: "",
        category: 0,
        keyword: 0,

        isShowError: false,
        errors: {},
        success: false,
        categories: [],
        keywords: [],
        isActive: false
    }

    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            product_title: "required|min:3",
            stickers_width: 'required|min_value:0',
            stickers_height: 'required|min_value:0',
            category: 'required|min_value:1',
            keyword: 'required|min_value:1'
        });
        this.props.allProductInfo();
        this.props.allCategories();
        this.props.allKeywords();
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
            type: "success",
            icon: "ni ni-bell-55",
            autoDismiss: 7
        };
        this.setState({isActive: false});
        this.refs.notificationAlert.notificationAlert(options);
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.categories) {
            this.setState({ categories: nextProps.categories });
        }
        if (nextProps.keywords) {
            this.setState({ keywords: nextProps.keywords });
        }
        if (nextProps.artist_list) {
            if (nextProps.artist_list.length > 0) {
                this.setState({ artist_list: nextProps.artist_list, artist: nextProps.artist_list[0].id });
            }
        }
        if (nextProps.printMode_list) {
            if (nextProps.printMode_list.length > 0) {
                this.setState({ printMode_list: nextProps.printMode_list, tshirt_printmode: nextProps.printMode_list[0].key });
            }
        }
        if (nextProps.stickerType_list) {
            if (nextProps.stickerType_list.length > 0) {
                this.setState({ stickerType_list: nextProps.stickerType_list, stickers_type: nextProps.stickerType_list[0].key });
            }
        }
        if (nextProps.price_tshirt) {
            if (nextProps.price_tshirt.length > 0) {
                nextProps.price_tshirt.map((item) => {
                    if (item.default == 1) {
                        this.setState({ price_tshirt: nextProps.price_tshirt, p_tshirt: item.id });
                    }
                });
            }
        }
        if (nextProps.price_sticker) {
            if (nextProps.price_sticker.length > 0) {
                nextProps.price_sticker.map((item) => {
                    if (item.default == 1) {
                        this.setState({ price_sticker: nextProps.price_sticker, p_sticker: item.id });
                    }
                });
            }
        }
        if (nextProps.price_mug) {
            if (nextProps.price_mug.length > 0) {
                nextProps.price_mug.map((item) => {
                    if (item.default == 1) {
                        this.setState({ price_mug: nextProps.price_mug, p_mug: item.id });
                    }
                });
            }
        }
        if (nextProps.price_cushioncover) {
            if (nextProps.price_cushioncover.length > 0) {
                nextProps.price_cushioncover.map((item) => {
                    if (item.default == 1) {
                        this.setState({ price_cushioncover: nextProps.price_cushioncover, p_cushioncover: item.id });
                    }
                });
            }
        }
        if (nextProps.price_totebag) {
            if (nextProps.price_totebag.length > 0) {
                nextProps.price_totebag.map((item) => {
                    if (item.default == 1) {
                        this.setState({ price_totebag: nextProps.price_totebag, p_totebag: item.id });
                    }
                });
            }
        }
        if (nextProps.price_hoody) {
            if (nextProps.price_hoody.length > 0) {
                nextProps.price_hoody.map((item) => {
                    if (item.default == 1) {
                        this.setState({ price_hoody: nextProps.price_hoody, p_hoody: item.id });
                    }
                });
            }
        }
        if (nextProps.price_kid) {
            if (nextProps.price_kid.length > 0) {
                nextProps.price_kid.map((item) => {
                    if (item.default == 1) {
                        this.setState({ price_kid: nextProps.price_kid, p_kid: item.id });
                    }
                });
            }
        }
        if (nextProps.product_image) {
            if (nextProps.product_image.length > 0) {
                this.setState({ product_image: nextProps.product_image, tshirt_image: nextProps.product_image[0].name });
            }
        }
        if (nextProps.message) {
            this.showNotification(nextProps.message);
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "product_title") {
            this.setState({ product_title: value });
        }
        if (name === "stickers_width") {
            this.setState({ stickers_width: value });
        }
        if (name === "stickers_height") {
            this.setState({ stickers_height: value });
        }
        const { product } = this.state;
        product[name] = value;
        this.setState({ product });
        const { errors } = this.state;
        if (name in errors) {
            const validation = this.validator.errors;
            this.validator.validate(name, value).then(() => {
                if (!validation.has(name)) {
                    delete errors[name];
                    this.setState({ errors });
                }
            });
        }
    }
    handleBlur = (e) => {
        const { name, value } = e.target;
        const validation = this.validator.errors;
        if (value === '') {
            return;
        }
        this.validator.validate(name, value).then(() => {
            if (validation.has(name)) {
                const { errors } = this.state;
                errors[name] = validation.first(name);
                this.setState({ errors });
            }
        });
    }
    handleSelect = (e) => {
        const { name, value } = e.target;
        if (name === "artist") {
            this.setState({ artist: value });
        }
        if (name === "tshirt_print") {
            this.setState({ tshirt_printmode: value });
        }
        if (name === "tshirt_image") {
            this.setState({ tshirt_image: value });
        }
        if (name === "stickers_type") {
            this.setState({ stickers_type: value });
        }
        if (name === "price_tshirt") {
            this.setState({ p_tshirt: value });
        }
        if (name === "price_sticker") {
            this.setState({ p_sticker: value });
        }
        if (name === "price_mug") {
            this.setState({ p_mug: value });
        }
        if (name === "price_totebag") {
            this.setState({ p_totebag: value });
        }
        if (name === "price_cushioncover") {
            this.setState({ p_cushioncover: value });
        }
        if (name === "price_hoody") {
            this.setState({ p_hoody: value });
        }
        if (name === "price_kid") {
            this.setState({ p_kid: value });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { product } = this.state;
        product['product_title'] = this.state.product_title;
        product['tshirt_printmode'] = this.state.tshirt_printmode;
        product['tshirt_image'] = this.state.tshirt_image;
        product['p_tshirt'] = this.state.p_tshirt;
        product['stickers_width'] = this.state.stickers_width;
        product['stickers_height'] = this.state.stickers_height;
        product['stickers_type'] = this.state.stickers_type;
        product['p_sticker'] = this.state.p_sticker;
        product['artist'] = this.state.artist;
        product['p_mug'] = this.state.p_mug;
        product['p_totebag'] = this.state.p_totebag;
        product['p_cushioncover'] = this.state.p_cushioncover;
        product['p_hoody'] = this.state.p_hoody;
        product['p_kid'] = this.state.p_kid;
        product['category'] = this.state.category;
        product['keyword'] = this.state.keyword;

        this.setState({ isShowError: true })
        this.validator.validateAll(product)
            .then((success) => {
                if (success) {
                    const {
                        product_title, keyword, category, p_tshirt, tshirt_printmode, artist, tshirt_image, stickers_width, stickers_height, stickers_type, p_sticker, p_mug, p_totebag, p_cushioncover, p_kid, p_hoody
                    } = this.state.product;
                    this.setState({ isActive: true });
                    this.props.createProduct({
                        product_title, keyword, category, p_tshirt, tshirt_printmode, artist, tshirt_image, stickers_width, stickers_height, stickers_type, p_sticker, p_mug, p_totebag, p_cushioncover, p_kid, p_hoody
                    });
                }
            });
    }

    handleCategorySelect = (id) => {
        this.setState({ category: id });
    }

    handleKeywordSelect = (id) => {
        this.setState({ keyword: id });
    }

    render() {
        const { errors, isActive } = this.state;
        const self = this;

        return (
            <>
                <MainHeader name="Product Create" parentName="Product" />
                <Container className="mt--6 product-create-container" fluid>
                    <LoadingOverlay
                        active={isActive}
                        spinner
                        text='Creating your product. Just a wait. It takes some time ...'
                    >
                        <Card style={{ minHeight: "700px" }}>
                            <CardBody>
                                <div className="rna-wrapper">
                                    <NotificationAlert ref="notificationAlert" />
                                </div>

                                <Form role="form" method="POST" onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Row>
                                                <Col md={8}>
                                                    <h4>Product Title</h4>
                                                    <hr />
                                                    <FormGroup>
                                                        <Input
                                                            type="text"
                                                            name="product_title"
                                                            onBlur={this.handleBlur}
                                                            onChange={this.handleChange}
                                                            invalid={"product_title" in errors}
                                                            placeholder="Enter Product Title"
                                                            className="form-control form-control"
                                                            required
                                                        />
                                                        <div className="invalid-feedback ml-5">
                                                            {errors.product_title}
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <h4>Artist</h4>
                                                    <hr></hr>
                                                    <FormGroup>

                                                        <Input
                                                            type="select"
                                                            name="artist"
                                                            value={this.state.artist}
                                                            onChange={this.handleSelect}
                                                            className="form-control form-control"
                                                        >
                                                            {this.state.artist_list.map(function (item) {
                                                                return <option key={item.key} value={item.id}>{item.name}</option>;
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <h4>Adult Tshirts</h4>
                                                    <hr className="label-hr" />
                                                    <FormGroup>
                                                        <Label>Price</Label>
                                                        <Input
                                                            type="select"
                                                            name="price_tshirt"
                                                            onChange={this.handleSelect}
                                                            value={this.state.p_tshirt}
                                                            className="form-control form-control"
                                                            placeholder="Enter Price"
                                                            required
                                                        >
                                                            {this.state.price_tshirt.map((item) => {
                                                                return <option key={item.key} value={item.id}>{item.name}</option>;
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <h4>Print Mode</h4>
                                                    <hr className="label-hr" />
                                                    <Label>&nbsp;</Label>
                                                    <FormGroup>
                                                        <Input
                                                            type="select"
                                                            name="tshirt_print"
                                                            value={this.state.tshirt_print}
                                                            className="form-control form-control"
                                                            onChange={this.handleSelect}
                                                        >
                                                            {this.state.printMode_list.map(function (item) {
                                                                return <option key={item.key} value={item.key}>{item.name}</option>;
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <h4>Product Image</h4>
                                                    <hr className="label-hr" />
                                                    <Label>&nbsp;</Label>
                                                    <FormGroup>
                                                        <Input
                                                            type="select"
                                                            name="tshirt_image"
                                                            value={this.state.tshirt_image}
                                                            onChange={this.handleSelect}
                                                            className="form-control form-control"
                                                        >
                                                            {this.state.product_image.map(function (item) {
                                                                return <option key={item.key} value={item.name}>{item.name}</option>;
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <h4>Stickers</h4>
                                            <hr className="label-hr" />
                                            <Row>
                                                <Col md={3}>
                                                    <FormGroup>
                                                        <Label>Width</Label>
                                                        <Input
                                                            type="number"
                                                            name="stickers_width"
                                                            onBlur={this.handleBlur}
                                                            onChange={this.handleChange}
                                                            invalid={"stickers_width" in errors}
                                                            className="form-control form-control"
                                                            placeholder="Enter Width"
                                                            required
                                                            min="0"
                                                        />
                                                        <div className="invalid-feedback ml-2">
                                                            {errors.stickers_width}
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={3}>
                                                    <FormGroup>
                                                        <Label>Height</Label>
                                                        <Input
                                                            type="number"
                                                            name="stickers_height"
                                                            onBlur={this.handleBlur}
                                                            onChange={this.handleChange}
                                                            invalid={"stickers_height" in errors}
                                                            className="form-control form-control"
                                                            placeholder="Enter Height"
                                                            required
                                                            min="0"
                                                        />
                                                        <div className="invalid-feedback ml-2">
                                                            {errors.stickers_height}
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={3}>
                                                    <FormGroup>
                                                        <Label>Type</Label>
                                                        <Input
                                                            type="select"
                                                            name="stickers_type"
                                                            value={this.state.sticker_type}
                                                            onChange={this.handleSelect}
                                                            className="form-control form-control"
                                                        >
                                                            {this.state.stickerType_list.map(function (item) {
                                                                return <option key={item.key} value={item.key}>{item.key}</option>;
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={3}>
                                                    <FormGroup>
                                                        <Label>Price</Label>
                                                        <Input
                                                            type="select"
                                                            name="price_sticker"
                                                            value={this.state.p_sticker}
                                                            onChange={this.handleSelect}
                                                            className="form-control form-control"
                                                        >
                                                            {this.state.price_sticker.map((item) => {
                                                                return <option key={item.key} value={item.id}>{item.name}</option>;
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <h4>Mugs</h4>
                                                    <hr />
                                                    <FormGroup>
                                                        <Input
                                                            type="select"
                                                            name="price_mug"
                                                            value={this.state.p_mug}
                                                            onChange={this.handleSelect}
                                                            className="form-control form-control"
                                                        >
                                                            {this.state.price_mug.map((item) => {
                                                                return <option key={item.key} value={item.id}>{item.name}</option>
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <h4>Tote Bags</h4>
                                                    <hr />
                                                    <FormGroup>
                                                        <Input
                                                            type="select"
                                                            name="price_totebag"
                                                            onChange={this.handleSelect}
                                                            value={this.state.p_totebag}
                                                            className="form-control form-control"
                                                        >
                                                            {this.state.price_totebag.map((item) => {
                                                                return <option key={item.key} value={item.id}>{item.name}</option>
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <h4>Cushion Covers</h4>
                                                    <hr />
                                                    <FormGroup>
                                                        <Input
                                                            type="select"
                                                            name="price_cushioncover"
                                                            value={this.state.p_cushioncover}
                                                            onChange={this.handleSelect}
                                                            className="form-control form-control"
                                                        >
                                                            {this.state.price_cushioncover.map((item) => {
                                                                return <option key={item.key} value={item.id}>{item.name}</option>
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <h4>Hoodies</h4>
                                                    <hr />
                                                    <FormGroup>
                                                        <Input
                                                            type="select"
                                                            name="price_hoody"
                                                            value={this.state.p_hoody}
                                                            onChange={this.handleSelect}
                                                            className="form-control form-control"
                                                            required
                                                        >
                                                            {this.state.price_hoody.map((item) => {
                                                                return <option key={item.key} value={item.id}>{item.name}</option>
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col md={4}>
                                                    <h4>Kids</h4>
                                                    <hr />
                                                    <FormGroup>
                                                        <Input
                                                            type="select"
                                                            name="price_kid"
                                                            value={this.state.p_kid}
                                                            onChange={this.handleSelect}
                                                            className="form-control form-control"
                                                            required
                                                        >
                                                            {this.state.price_kid.map((item) => {
                                                                return <option key={item.key} value={item.id}>{item.name}</option>
                                                            })}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12}>
                                                    <Button type="submit" className="float-left btn btn-info">Create</Button>
                                                    <Link to="/product/list">
                                                        <Button type="button" className="float-right btn btn-primary">Cancel</Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={2}>
                                            <div>
                                                <h4>Category</h4>
                                                <hr />
                                                <ul className="list-group list-group-flush">
                                                    {this.state.categories.map(function (item) {
                                                        return <li
                                                            className={classnames('list-group-item list-group-item-action', { 'active': item.id === self.state.category })}
                                                            onClick={() => self.handleCategorySelect(item.id)}
                                                            action="true"
                                                            key={item.id}
                                                        >
                                                            {item.name}
                                                        </li>;
                                                    })}
                                                </ul>
                                                {
                                                    (this.state.isShowError && this.state.category === 0) && <div className="invalid-category"><p>Please select category</p></div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div>
                                                <h4>Keyword</h4>
                                                <hr />
                                                <ul className="list-group list-group-flush">
                                                    {this.state.keywords.map(function (item) {
                                                        return <li
                                                            className={classnames('list-group-item list-group-item-action', { 'active': item.id === self.state.keyword })}
                                                            onClick={() => self.handleKeywordSelect(item.id)}
                                                            action="true"
                                                            key={item.id}
                                                        >
                                                            {item.tshirts}
                                                        </li>;
                                                    })}
                                                </ul>
                                            </div>
                                            {
                                                (this.state.isShowError && this.state.keyword === 0) && <div className="invalid-keyword"><p>Please select keyword</p></div>
                                            }
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </LoadingOverlay>
                </Container>
            </>
        );
    }
}

const mapStateToProps = ({ category, keyword,product}) => ({
    categories: category.categories,
    keywords: keyword.keywords,
    artist_list: product.all_product.length == 11 ? product.all_product[0] : [],
    stickerType_list: product.all_product.length == 11 ? product.all_product[1] : [],
    printMode_list: product.all_product.length == 11 ? product.all_product[2] : [],
    price_tshirt: product.all_product.length == 11 ? product.all_product[3] : [],
    price_sticker: product.all_product.length == 11 ? product.all_product[4] : [],
    price_mug: product.all_product.length == 11 ? product.all_product[5] : [],
    price_totebag: product.all_product.length == 11 ? product.all_product[6] : [],
    price_cushioncover: product.all_product.length == 11 ? product.all_product[7] : [],
    price_hoody: product.all_product.length == 11 ? product.all_product[8] : [],
    price_kid: product.all_product.length == 11 ? product.all_product[9] : [],
    product_image: product.all_product.length == 11 ? product.all_product[10] : [],
    message: product.message
});
export default connect(mapStateToProps, {
    allCategories,
    allKeywords,
    createProduct,
    allProductInfo
})(ProductCreate);