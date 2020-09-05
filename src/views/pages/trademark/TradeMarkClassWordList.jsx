import React from "react";
import classnames from "classnames";
import ReeValidate from "ree-validate";
import { connect } from "react-redux";

import NotificationAlert from "react-notification-alert";
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
  Input,
} from "reactstrap";

import MainHeader from "../../components/headers/MainHeader";
import http from "../../../helper/http";
import {
  createClassWord,
  updateClassWord,
  deleteClassWord,
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
      modalWord: {
        id: 0,
        name: "",
      },
      message: "",
      responseErrors: "",
      errors: {},
      isModal: false,
      isDeleteModal: false,
    };
    this.validator = new ReeValidate({
      name: "required|min:2",
    });
  }

  componentDidMount() {
    this.setState({ current_page: this.state.entities.current_page }, () => {
      this.fetchEntities();
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.showNotification(nextProps.message);
      this.setState(
        {
          isModal: false,
          isDeleteModal: false,
          current_page: this.state.first_page,
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
  searchKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { value } = e.target;
      this.setState(
        { current_page: this.state.first_page, searchKey: value },
        () => {
          this.fetchEntities();
        }
      );
    }
  };

  handleEdit(id) {
    const { data } = this.state.entities;
    const word = data.find((obj) => {
      return obj.id == id;
    });
    this.setState({
      modalWord: { ...word },
      isModal: true,
      responseErrors: "",
      errors: {},
    });
  }

  handleDelete(id) {
    const { data } = this.state.entities;
    const word = data.find((obj) => {
      return obj.id == id;
    });
    this.setState({
      modalWord: { ...word },
      isDeleteModal: true,
      responseErrors: "",
    });
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
    let icon;
    if (this.state.order === "asc") {
      icon = <i className="fa fa-sort-alpha-down"></i>;
    } else {
      icon = <i className="fa fa-sort-alpha-up"></i>;
    }
    let columns = this.columns.map((column) => {
      if (column == "id") {
        return (
          <th
            scope="col"
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
            scope="col"
            className="text-center"
            style={{ width: "75%" }}
            key={column}
            onClick={() => this.sortByColumn(column)}
          >
            {this.columnHead(column)}
            {column === this.state.sorted_column && icon}
          </th>
        );
      }
    });
    columns.push(
      <th
        scope="col"
        className="text-center"
        key="action"
        style={{ width: "20%" }}
      >
        Action
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
              if (key == "id")
                return (
                  <td className="text-center" key={key}>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={`class-number-${current_number}`}
                      />
                      <label className="custom-control-label" for={`class-number-${current_number}`}>
                        {current_number}
                      </label>
                    </div>
                  </td>
                );
              else
                return (
                  <td key={key} style={{whiteSpace: 'normal'}}>
                    {data[key]}
                  </td>
                );
            })}
            <td className="td-action">
              <Row>
                <Col md={12} xl={12}>
                  <Button
                    className="btn-tbl-categorylist-edit"
                    size="sm"
                    color="primary"
                    data-dz-remove
                    onClick={(e) => {
                      self.handleEdit(data.id);
                    }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-clone fa-flip-vertica" />
                    </span>
                    <span className="btn-inner--text">
                      <a
                        href={`http://xeno.ipaustralia.gov.au/tmgns/facelets/trademarkclass.xhtml?classId=${current_number}`}
                        target="blank"
                        style={{ color: '#fff' }}
                      >
                        {"MORE INFO"}
                      </a>
                    </span>
                  </Button>
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
            No Records Found.
          </td>
        </tr>
      );
    }
  }

  sortByColumn(column) {
    if (column === this.state.sorted_column) {
      this.state.order === "asc"
        ? this.setState(
          { order: "desc", current_page: this.state.first_page },
          () => {
            this.fetchEntities();
          }
        )
        : this.setState({ order: "asc" }, () => {
          this.fetchEntities();
        });
    } else {
      this.setState(
        {
          sorted_column: column,
          order: "asc",
          current_page: this.state.first_page,
        },
        () => {
          this.fetchEntities();
        }
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

  createWord() {
    this.setState({
      isModal: true,
      modalWord: {
        id: 0,
        name: "",
      },
      responseErrors: "",
      errors: {},
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { modalWord } = this.state;
    modalWord[name] = value;
    this.setState({ modalWord });

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
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = this.validator.errors;

    if (value === "") {
      return;
    }

    this.validator.validate(name, value).then(() => {
      if (validation.has(name)) {
        const { errors } = this.state;
        errors[name] = validation.first(name);
        this.setState({ errors });
      }
    });
  };

  handleSubmitDelete = (e) => {
    e.preventDefault();
    const { modalWord } = this.state;
    const { id } = modalWord;
    this.props.deleteClassWord(id);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { modalWord } = this.state;
    this.validator.validateAll(modalWord).then((success) => {
      if (success) {
        if (modalWord.id === 0) {
          const { name } = modalWord;
          this.props.createClassWord({
            name,
          });
        } else {
          const { id, name } = modalWord;
          this.props.updateClassWord({
            id,
            name,
          });
        }
      }
    });
  };

  showNotification = (message) => {
    let options = {
      place: "tr",
      message: (
        <div className="alert-text">
          <span
            className="alert-title"
            data-notify="title"
            dangerouslySetInnerHTML={{ __html: message }}
          ></span>
        </div>
      ),
      type: "success",
      icon: "ni ni-bell-55",
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  render() {
    return (
      <>
        <div className="rna-wrapper">
          <NotificationAlert ref="notificationAlert" />
        </div>
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
  createClassWord,
  updateClassWord,
  deleteClassWord,
})(TrademarkClassWordList);
