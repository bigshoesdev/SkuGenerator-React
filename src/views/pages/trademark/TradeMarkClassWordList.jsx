import React from "react";
import classnames from "classnames";
import ReeValidate from "ree-validate";
import { connect } from "react-redux";

import {
  Table,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";
import http from "../../../helper/http";
import {
  updateClassWord
} from "../../../store/actions/trademark";
import APP_CONST from "../../../helper/constant";

class TrademarkClassWordList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = ["id", "name"];
    this.state = {
      entities: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 1,
      },
      first_page: 1,
      current_page: 1,
      sorted_column: this.columns[0],
      offset: 5,
      order: "asc",
      searchKey: "",
      message: "",
      responseErrors: "",
      errors: {},
    };
    this.validator = new ReeValidate({
      name: "required|min:2",
    });

    this.handleChecked = this.handleChecked.bind(this);
  }

  componentDidMount() {
    this.setState({ current_page: this.state.entities.current_page }, () => {
      this.fetchEntities();
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState(
        {
          current_page: this.state.current_page,
        },
        () => {
          this.fetchEntities();
        }
      );
    }
    if (
      nextProps.responseErrors &&
      nextProps.responseErrors != this.state.responseErrors
    ) {
      this.setState({
        responseErrors: nextProps.responseErrors,
      });
    }
  }

  fetchEntities() {
    let fetchUrl = `${APP_CONST.API_URL}/trademark/classword/list/?&page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}&search_key=${this.state.searchKey}`;
    http
      .get(fetchUrl)
      .then((response) => {
        this.setState({ entities: response.data.data });
      })
      .catch((e) => {
        this.setState({
          entities: {
            data: [],
            current_page: 1,
            last_page: 1,
            per_page: 20,
            total: 1,
          },
        });
      });
  }

  handleChecked(event) {
    const { id, name } = event.target;
    var checked = document.getElementById(id).checked;
    this.props.updateClassWord({ id: name, checked: checked });
  }

  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {
      this.fetchEntities();
    });
  }

  pagesNumbers() {
    if (!this.state.entities.to) {
      return [];
    }
    let from = this.state.entities.current_page - this.state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + this.state.offset * 2 - 1;
    if (to >= this.state.entities.last_page) {
      to = this.state.entities.last_page;
      from = this.state.entities.last_page - this.state.offset * 2;
      if (from < 1) {
        from = 1;
      }
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    return pagesArray;
  }

  columnHead(value) {
    return value.split("_").join(" ").toUpperCase();
  }

  tableHeads() {
    let columns = this.columns.map((column) => {
      if (column == "id") {
        return (
          <th
            className="text-center"
            style={{ width: "7%" }}
            key={column}
          >
            {"NO"}
          </th>
        );
      } else {
        return (
          <th
            className="text-center"
            style={{ width: "75%" }}
            key={column}
          >
            {this.columnHead(column)}
          </th>
        );
      }
    });
    columns.push(
      <th
        className="text-center"
        key="action"
        style={{ width: "12%" }}
      >
        {"Action"}
      </th>
    );
    return columns;
  }

  dataList() {
    var self = this;
    if (this.state.entities.data.length) {
      return this.state.entities.data.map((data, index) => {
        let current_number = (this.state.current_page - 1) * 20 + index + 1;

        return (
          <tr key={data.id}>
            {Object.keys(data).map((key) => {
              if (key == "checked")
                return (
                  <td className="text-center" key={key}>
                    <div className="custom-control custom-checkbox">
                      <input
                        id={`class-number-${current_number}`}
                        name={current_number}
                        className="custom-control-input"
                        type="checkbox"
                        checked={data[key]}
                        onChange={this.handleChecked}
                      />
                      <label
                        className={`custom-control-label ${current_number < 10 ? 'pl-2' : ''}`}
                        htmlFor={`class-number-${current_number}`}
                      >
                        {current_number}
                      </label>
                    </div>
                  </td>
                );
              else if (key !== 'id') {
                return (
                  <td key={key} style={{ whiteSpace: 'normal' }}>
                    {data[key]}
                  </td>
                );
              }
            })}
            <td className="td-action">
              <Row>
                <Col md={12} xl={12}>
                  <a
                    href={`http://xeno.ipaustralia.gov.au/tmgns/facelets/trademarkclass.xhtml?classId=${current_number}`}
                    target="blank"
                    style={{ color: '#fff' }}
                  >
                    <Button
                      className="btn-tbl-categorylist-edit"
                      size="sm"
                      color="primary"
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="fas fa-clone fa-flip-vertica" />
                      </span>
                      <span className="btn-inner--text">
                        {"MORE INFO"}
                      </span>
                    </Button>
                  </a>
                </Col>
              </Row>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td
            colSpan={this.columns.length + 1}
            className="text-center td-noredords"
          >
            {"No Records Found."}
          </td>
        </tr>
      );
    }
  }

  pageList() {
    return this.pagesNumbers().map((page) => {
      return (
        <PaginationItem
          className={classnames({
            active: page === this.state.entities.current_page,
          })}
          key={"pagination-" + page}
        >
          <PaginationLink onClick={() => this.changePage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  }

  render() {
    return (
      <>
        <MainHeader name="Trademark Class Word List" parentName="Trademark" />
        <Container className="mt--6 category-list-container" fluid>
          <Card style={{ minHeight: "700px" }}>
            <CardBody>
              <Row className="mt-5">
                <Col md={12} xl={12}>
                  <div className="div-tbl-categorylist">
                    <Table
                      className="align-items-center"
                      style={{ tableLayout: "fixed" }}
                      hover
                      bordered
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>{this.tableHeads()}</tr>
                      </thead>
                      <tbody>{this.dataList()}</tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0"
                >
                  <PaginationItem
                    className={classnames({
                      disabled: 1 == this.state.entities.current_page,
                    })}
                  >
                    <PaginationLink
                      onClick={() =>
                        this.changePage(this.state.entities.current_page - 1)
                      }
                    >
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {this.pageList()}
                  <PaginationItem
                    className={classnames({
                      disabled:
                        this.state.entities.last_page ===
                        this.state.entities.current_page,
                    })}
                  >
                    <PaginationLink
                      onClick={() =>
                        this.changePage(this.state.entities.current_page + 1)
                      }
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
}

const mapStateToProps = ({ trademark }) => ({
  responseErrors: trademark.errors,
  message: trademark.message,
});

export default connect(mapStateToProps, {
  updateClassWord
})(TrademarkClassWordList);
