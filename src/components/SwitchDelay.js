import React, { useState, useEffect } from 'react';
import {
    Form, Row, Col
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SwitchDelay(props) {

    const [ondelay, setOndeley] = useState(props.ondelay);
    const [offdelay, setOffdelay] = useState(props.offdelay);

    return (
        // The switch has a label that comes in from props and is
        // set to the value in 'switchState', true or false.
        <Form>
            <Row>
                <Col>
                    <Form.Text>{props.switchLabel}</Form.Text>
                </Col>
                <Col>
                    <Form.Text>{props.ondelay}</Form.Text>
                </Col>
                <Col>
                    <Form.Text>{props.offdelay}</Form.Text>
                </Col>
            </Row>
        </Form>
        
    )
}

export default SwitchDelay;