import React, { useState, useEffect } from 'react';

import PDUSwitch from './PDUSwitch';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import configData from "../config.json";
import './PDUDisplay.css';

function PDUDisplay() {

    useEffect(() => { 
      const initialSetup = 8;
    }, []);

    return (
        <div class="pdudisp-div">
            <p>name of pdu</p>
        <Col xs="auto" style={{ minWidth: 150, paddingLeft: 10, paddingRight: 0 }}>
            <PDUSwitch switchLabel="mount" state={true} />
            <PDUSwitch switchLabel="filter wheel" state={false} />
            <PDUSwitch switchLabel="camera" state={false} />
            <PDUSwitch switchLabel="focuser" state={false} />
            <PDUSwitch switchLabel="dome" state={true} />
        </Col>
        </div>
    )
}

export default PDUDisplay;