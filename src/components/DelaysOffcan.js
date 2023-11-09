import React, { useState } from 'react';
import {
  Offcanvas,
  Form,
  Row,
  Col
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SwitchDelay from './SwitchDelay'

function DelaysOffcan(props) {

  const { outlets, showDelays, toggleShowDelays } = props
  
    const renderDelays = ()  => {
        if (outlets != null) {
            return(outlets.map(function(data, i) {
                // console.log(outlets)
                var label = data[0];
                var state = data[1];
                var ondelay = data[2];
                var offdelay = data[3];
                var pending = data[4];
                return (
                    <SwitchDelay 
                    switchLabel = {label}
                    ondelay = {ondelay}
                    offdelay = {offdelay}
                    switchnum = {i}
                    key = {i} />
                )
            })
        )}
    }

    return (
        <Offcanvas
            placement={'end'}
            show={showDelays}
            onHide={toggleShowDelays}
            style={{ background: "rgb(254, 254, 180)" }}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Outlet Delays</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Row>
                <Col>
                    <Form.Text>Outlet</Form.Text>
                </Col>
                <Col>
                    <Form.Text>on-delay</Form.Text>
                </Col>
                <Col>
                    <Form.Text>off-delay</Form.Text>
                </Col>
            </Row>
            <hr/>
            {renderDelays()}
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default DelaysOffcan;