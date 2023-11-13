import React from 'react';
import {
  Container,
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUNavbar.css';

import logo from "../assets/images/lowelllogo_horizontal_black_web.png";

function PDUNavbar() {

  return (
    <Navbar className="color-nav" fixed="top" expand="sm">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="115"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Container className="justify-content-center">
                Lorax PDU Interface
            </Container>
            <Nav className="ms-auto">
                <NavItem>
                    TiMo
                </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default PDUNavbar;