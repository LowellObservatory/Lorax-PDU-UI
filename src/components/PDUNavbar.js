import React from 'react';
import {
  Container,
  Navbar
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUNavbar.css';

import logo from "../assets/images/lowelllogo_horizontal_black_web.png";

function PDUNavbar() {

  return (
    <Navbar className="color-nav" fixed="top" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="115"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Container>
          <Navbar.Text>Lorax PDU Interface</Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default PDUNavbar;