import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { authLogout } from '../../../store/actions/auth';

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";

class AdminNavbar extends React.Component {
  logOut() {
    this.props.authLogout();
  }

  render() {
    return (
      <>
        <Navbar
          className={classnames(
            "navbar-top navbar-expand border-bottom",
            { "navbar-dark bg-info": this.props.theme === "dark" },
            { "navbar-light bg-secondary": this.props.theme === "light" }
          )}
        >
          <Container fluid>
            <Collapse navbar isOpen={true}>
              <Nav className="align-items-center ml-md-auto" navbar>
                <NavItem className="d-xl-none">
                  <div
                    className={classnames(
                      "pr-3 sidenav-toggler",
                      { active: this.props.sidenavOpen },
                      { "sidenav-toggler-dark": this.props.theme === "dark" }
                    )}
                    onClick={this.props.toggleSidenav}
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </div>
                </NavItem>
              </Nav>
              <Nav className="align-items-center ml-auto ml-md-0" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="..."
                          src={require("assets/img/theme/avatar.jpg")}
                        />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          {this.props.user.name}
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div" >
                      <h6 className="text-overflow m-0" style={{'cursor': 'pointer'}}>Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem
                      onClick={e => e.preventDefault()}
                      style={{'cursor': 'pointer'}}
                    >
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={e => this.logOut()}
                      style={{'cursor': 'pointer'}}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => { },
  sidenavOpen: false,
  theme: "dark"
};

AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"])
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps, { authLogout })(withRouter(AdminNavbar));