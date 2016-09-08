import React, { Component, PropTypes } from 'react'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Grid, Row, Col, Button } from 'react-bootstrap'

class MainLayout extends Component {
  render() {
    const { auth } = this.props
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
            <a href='/'>Gitter</a>
            </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            { auth.token &&
              <NavItem eventKey={1} href='https://gitter.im/home#createroom'>Create Room</NavItem>
            }
            <NavDropdown eventKey={3} title={auth.user.displayName ? auth.user.displayName : 'Authorization'} id='basic-nav-dropdown'>
              <MenuItem href='/login' eventKey={3.1}>Login</MenuItem>
              <MenuItem href='/logout' eventKey={3.2}>Logout</MenuItem>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          {this.props.children}
        </div>
      </div>
  )}
}

MainLayout.propTypes = {
  auth: PropTypes.object.isRequired
}

export default MainLayout