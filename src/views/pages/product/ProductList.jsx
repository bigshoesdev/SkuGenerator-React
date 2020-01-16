import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Table,
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import MainHeader from '../../components/headers/MainHeader'
import APP_CONST from '../../../helper/constant'
import http from '../../../helper/http'
import { productDelete } from '../../../store/actions/product'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.form = React.createRef();
    this.columns = [
      'id',
      'title',
      'image_stickers',
      'check_stickers',
      'name_stickers',
      'image_tshirts',
      'check_tshirts',
      'name_tshirts',
      'image_mugs',
      'check_mugs',
      'name_mugs',
      'image_bags',
      'check_bags',
      'name_bags',
      'image_covers',
      'check_covers',
      'name_covers',
      'image_kids',
      'check_kids',
      'name_kids',
      'image_hoodies',
      'check_hoodies',
      'name_hoodies'
    ]
    this.state = {
      imageUrl: [],
      onlyData: [],
      entities: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1
      },
      first_page: 1,
      current_page: 1,
      sorted_column: this.columns[1],
      offset: 5,
      order: 'asc',
      searchKey: '',
      modalKeyword: {
        id: 0,
        tshirts: '',
        stickers: '',
        mugs: '',
        tote_bags: '',
        cushion_covers: '',
        kids: '',
        hoodies: ''
      },
      message: '',
      responseErrors: '',
      errors: {},
      isModal: false,
      isDeleteModal: false,
      isUploadData: [],
    }
    this.onSubmitExport = this.onSubmitExport.bind(this);
    this.onclickExport = this.onclickExport.bind(this);
  }
  componentDidMount() {
    this.setState({ current_page: this.state.entities.current_page }, () => {
      this.fetchEntities()
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.imageUrl) {
      this.setState({ imageUrl: nextProps.imageUrl })
    }
    if (nextProps.message) {
      this.fetchEntities()
    }
  }
  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {
      this.fetchEntities()
    })
  }
  fetchEntities() {
    let fetchUrl = `${APP_CONST.API_URL}/product/list/?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}&search_key=${this.state.searchKey}`
    http
      .get(fetchUrl)
      .then(response => {
        this.setState({
          entities: response.data.data,
          onlyData: response.data.data.data
        })
        // this.setState({ onlyData: response.data.data.data});
      })
      .catch(e => {
        this.setState({
          entities: {
            data: [],
            current_page: 1,
            last_page: 1,
            per_page: 2,
            total: 1
          }
        })
      })
  }
  searchKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const { value } = e.target
      this.setState(
        { current_page: this.state.first_page, searchKey: value },
        () => {
          this.fetchEntities()
        }
      )
    }
  }
  pagesNumbers() {
    if (!this.state.entities.to) {
      return []
    }
    let from = this.state.entities.current_page - this.state.offset
    if (from < 1) {
      from = 1
    }
    let to = from + this.state.offset * 2 - 1
    if (to >= this.state.entities.last_page) {
      to = this.state.entities.last_page
      from = this.state.entities.last_page - this.state.offset * 2
      if (from < 1) {
        from = 1
      }
    }
    let pagesArray = []
    for (let page = from; page <= to; page++) {
      pagesArray.push(page)
    }
    return pagesArray
  }
  columnHead(value) {
    const name = value.toUpperCase().split('_')
    if (name.length > 1) return name[1]
    else return name
  }
  sortByColumn(column) {
    if (column === this.state.sorted_column) {
      this.state.order === 'asc'
        ? this.setState(
          { order: 'desc', current_page: this.state.first_page },
          () => {
            this.fetchEntities()
          }
        )
        : this.setState({ order: 'asc' }, () => {
          this.fetchEntities()
        })
    } else {
      this.setState(
        {
          sorted_column: column,
          order: 'asc',
          current_page: this.state.first_page
        },
        () => {
          this.fetchEntities()
        }
      )
    }
  }
  pageList() {
    return this.pagesNumbers().map(page => {
      return (
        <PaginationItem
          className={classnames({
            active: page === this.state.entities.current_page
          })}
          key={'pagination-' + page}
        >
          <PaginationLink onClick={() => this.changePage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }
  tableHeads() {
    let icon
    if (this.state.order === 'asc') {
      icon = <i className='fa fa-sort-alpha-down'></i>
    } else {
      icon = <i className='fa fa-sort-alpha-up'></i>
    }
    let columns = this.columns.map(column => {
      if (column == 'id') {
        return (
          <th
            scope='col'
            className='text-center'
            style={{ width: '5%' }}
            key={column}
          >
            {'No'}
          </th>
        )
      } else if (column.includes('check')) {
        return (
          <th
            scope='col'
            key={column}
            className='text-center'
            style={{ width: '3%' }}
          ></th>
        )
      } else if (column.includes('image')) {
        return (
          <th
            scope='col'
            key={column}
            className='text-center'
            style={{ width: '13%' }}
          >
            IMAGE
          </th>
        )
      } else if (column.includes('title')) {
        return (
          <th
            scope='col'
            className='text-center'
            style={{ minWidth: '200px' }}
            key={column}
            onClick={() => this.sortByColumn(column)}
          >
            {this.columnHead(column)}
            {column === this.state.sorted_column && icon}
          </th>
        )
      } else {
        return (
          <th
            scope='col'
            className='text-center'
            style={{ width: '25%' }}
            key={column}
            onClick={() => this.sortByColumn(column)}
          >
            {this.columnHead(column)}
            {column === this.state.sorted_column && icon}
          </th>
        )
      }
    })
    columns.push(
      <th
        scope='col'
        className='text-center'
        key='action'
        style={{ width: '6%' }}
      >
        Action
      </th>
    )
    return columns
  }

  handleDetail(id) {
    this.props.history.push('/main/product-detail/' + id)
  }
  handleCheck(e, name) {
    if (e.target.checked) {
      //var data = this.state.isUploadData;
      var data = [...this.state.isUploadData]
      if (data.indexOf(name) === -1) {
        data.push(name)
        this.setState({ isUploadData: data })
      }
    }
  }
  dataList() {
    var self = this
    if (this.state.entities.data.length) {
      return this.state.entities.data.map((product, index) => {
        return (
          <tr key={product.id}>
            {Object.keys(product).map((key, i) => {
              if (key === 'id') {
                return (
                  <td key={key} className='text-center'>
                    {index + 1}
                  </td>
                )
              } else if (key.includes('isupload')) {
                if (product[key] == '1') {
                  return (
                    <td key={key}>
                      <div className='custom-control custom-checkbox product-item-checkbox'>
                        <Input
                          className='custom-control-input'
                          id={key + index}
                          type='checkbox'
                          disabled
                        />
                        <label
                          className='custom-control-label'
                          htmlFor={key + index}
                        ></label>
                      </div>
                    </td>
                  )
                } else {
                  return (
                    <td key={key}>
                      <div className='custom-control custom-checkbox product-item-checkbox'>
                        <Input
                          className='custom-control-input'
                          id={key + index}
                          type='checkbox'
                          onChange={e =>
                            self.handleCheck(
                              e,
                              product[Object.keys(product)[i + 1]]
                            )
                          }
                        />
                        <label
                          className='custom-control-label'
                          htmlFor={key + index}
                        ></label>
                      </div>
                    </td>
                  )
                }
              } else if (key.includes('image')) {
                let url = "http://127.0.0.1:5000/data/dropbox?fileName=" + product[key].replace('.jpg', '');
                return (
                  <td key={key}>
                    {/* <img
                      className='img-tbl-productlist'
                      // src={url}
                      alt=''
                    /> */}
                  </td>
                )
              } else {
                return (
                  <td
                    className='text-center'
                    key={key}
                    style={{ width: '40px', height: '40px' }}
                  >
                    {product[key]}
                  </td>
                )
              }
            })}
            <td className='td-action'>
              <UncontrolledDropdown>
                <DropdownToggle
                  className='btn-icon-only text-light'
                  color=''
                  role='button'
                  size='sm'
                >
                  <i className='fas fa-ellipsis-v' />
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-arrow' right>
                  <DropdownItem
                    onClick={e => {
                      self.handleDetail(product.id)
                    }}
                  >
                    Detail
                  </DropdownItem>
                  <DropdownItem
                    onClick={e => {
                      self.handleDelete(product.id)
                    }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        )
      })
    } else {
      return (
        <tr>
          <td
            colSpan={this.columns.length + 1}
            className='text-center td-noredords'
          >
            No Records Found.
          </td>
        </tr>
      )
    }
  }

  handleDelete(id) {
    this.props.productDelete({ id: id })
  }

  onSubmitExport(event) {
    event.preventDefault();
    // this.refs.refexport.click();
    //this.form.dispatchEvent(new Event("submit"));
  }
  onclickExport() {
    // this.form.dispatchEvent(new Event("submit"));
    this.refs.refexport.click();
  }
  render() {
    return (
      <>
        <MainHeader name='Product List' parentName='Product' />
        <Container className='mt--6 product-list-container' fluid>
          <Card style={{ minHeight: '700px' }}>
            <CardBody>
              <Row>
                <Col>
                  <form action="http://127.0.0.1:5000/export" ref={f => (this.form = f)} method="get">
                    <input type="hidden" name="data" value={JSON.stringify(this.state.isUploadData)}></input>
                    <Button className="btn-productList" color="primary" type="submit">Export CSV</Button>
                  </form>
                </Col>
                <Col>
                  <div className='div-searchbar-product'>
                    <Form className='navbar-search form-inline mr-sm-3 '>
                      <FormGroup className='mb-0'>
                        <InputGroup className='input-group-alternative input-group-merge'>
                          <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                              <i className='fas fa-search' />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder='Search'
                            type='text'
                            name='searchKey'
                            onKeyDown={this.searchKey}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} xl={12}>
                  <div className='div-tbl-productlist'>
                    <Table
                      className='align-items-center'
                      hover
                      bordered
                      responsive
                    >
                      <thead className='thead-light'>
                        <tr>{this.tableHeads()}</tr>
                      </thead>
                      <tbody>{this.dataList()}</tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className='py-4'>
              <nav aria-label='...'>
                <Pagination
                  className='pagination justify-content-end mb-0'
                  listClassName='justify-content-end mb-0'
                >
                  <PaginationItem
                    className={classnames({
                      disabled: 1 == this.state.entities.current_page
                    })}
                  >
                    <PaginationLink
                      onClick={() =>
                        this.changePage(this.state.entities.current_page - 1)
                      }
                    >
                      <i className='fas fa-angle-left' />
                      <span className='sr-only'>Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {this.pageList()}
                  <PaginationItem
                    className={classnames({
                      disabled:
                        this.state.entities.last_page ===
                        this.state.entities.current_page
                    })}
                  >
                    <PaginationLink
                      onClick={() =>
                        this.changePage(this.state.entities.current_page + 1)
                      }
                    >
                      <i className='fas fa-angle-right' />
                      <span className='sr-only'>Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
          </Card>
        </Container>
      </>
    )
  }
}
const mapStateToProps = ({ product }) => ({
  imageUrl: product.imageUrl,
  message: product.message
})
export default connect(mapStateToProps, {
  productDelete
})(withRouter(ProductList))
