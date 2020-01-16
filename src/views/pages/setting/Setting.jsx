import React from "react";
import { connect } from "react-redux";

import {
  updateSetting, getSetting
} from "../../../store/actions/setting";

import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input,
  Container,
  Button,
  CustomInput,
  Form
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";

class Setting extends React.Component {
  state = {
    sku_number: '',
    brand: '',
    exportCSV: '',
    uploadCSV: '',
    dropbox_root: '',
    weight: '',
    setting: [],
    message: "",
    responseErrors: "",
    allupdate: false,
  }

  constructor(props) {
    super(props);
    this.props.getSetting();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setting) {
      this.setState({
        setting: nextProps.setting,
        'sku_number': nextProps.setting.sku_number,
        'brand': nextProps.setting.brand,
        'dropbox_root': nextProps.setting.dropbox_root,
        'weight': nextProps.setting.weight,
      });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmitSkuNumber = (e) => {
    e.preventDefault();
    const { sku_number } = this.state;
    this.props.updateSetting({
      value: sku_number,
      type: "sku_number"
    })
  }

  onSubmitdropbox = (e) => {
    e.preventDefault();
    const { dropbox_root } = this.state;
    this.props.updateSetting({
      value: dropbox_root,
      type: "dropbox_root"
    })
  }

  onSubmitWeigth = (e) => {
    e.preventDefault();
    const { weight } = this.state;
    this.props.updateSetting({
      value: weight,
      type: "weight"
    })
  }

  onSubmitBrandName = (e) => {
    e.preventDefault();
    const { brand } = this.state;
    this.props.updateSetting({
      value: brand,
      type: "brand_name"
    })
  }

  onSubmitExportCSV = (e) => {
    e.preventDefault();
  }

  onSubmitUploadCSV = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <>
        <MainHeader name="Setting" parentName="Setting" />
        <Container className="mt--6 setting-container" fluid>
          <Card style={{ minHeight: "700px" }}>
            <CardBody>
              <Row>
                <Col md={4}>
                  <Form role="form" method="POST" onSubmit={this.onSubmitSkuNumber}>
                    <h4 className="sku-title">SKU Number</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className="sku-number">
                          <Input
                            type="text"
                            name="sku_number"
                            value={this.state.sku_number}
                            onChange={this.handleChange}
                            placeholder="Enter SKU Number"
                            className="form-control form-control"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type="submit" color="primary">Save</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md={4}>
                  <Form role="form" method="POST" onSubmit={this.onSubmitBrandName}>
                    <h4 className="brand-title">Brand </h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className="brand-name">
                          <Input
                            type="text"
                            name="brand"
                            value={this.state.brand}
                            onChange={this.handleChange}
                            placeholder="Enter Brand"
                            className="form-control form-control"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type="submit" color="primary">Save</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md={4}>
                  <Form role="form" method="POST" onSubmit={this.onSubmitdropbox}>
                    <h4 className="dropbox-title">Drop Box</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className="dropbox">
                          <Input
                            type="text"
                            name="dropbox_root"
                            value={this.state.dropbox_root}
                            onChange={this.handleChange}
                            placeholder="Enter dropbox Root URL"
                            className="form-control form-control"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type="submit" color="primary">Save</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form role="form" method="POST" onSubmit={this.onSubmitWeigth}>
                    <h4 className="dropbox-title">Weight (kg)</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <FormGroup className="weight">
                          <Input
                            type="text"
                            name="weight"
                            value={this.state.weight}
                            onChange={this.handleChange}
                            placeholder="Enter dropbox Root URL"
                            className="form-control form-control"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Button type="submit" color="primary">Save</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
              <hr className="setting-divider" />
              <Row>
                <Col md={4}>
                  <Form onSubmit={this.onSubmitExportCSV}>
                    <h4 className="sku-title">Export CSV</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <CustomInput type="file" name="customFile" id="exampleCustomFileBrowser" label="Export CSV" />
                      </Col>
                      <Col md={4}>
                        <Button type="submit" color="primary">Save</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
                <Col md={4}>
                  <Form onSubmit={this.onSubmitUploadCSV}>
                    <h4 className="sku-title">Upload CSV</h4>
                    <hr />
                    <Row>
                      <Col md={8}>
                        <CustomInput type="file" name="customFile" id="upload_csv" label="Upload CSV" />
                      </Col>
                      <Col md={4}>
                        <Button type="submit" color="primary">Save</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ setting }) => ({
  responseErrors: setting.errors,
  message: setting.message,
  setting: setting.setting
});

export default connect(mapStateToProps, {
  updateSetting, getSetting
})(Setting);
