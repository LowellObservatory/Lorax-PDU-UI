import React, { useState, useEffect } from 'react';
import {
    Form, Row, Col
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SwitchDelay(props) {

    const [ondelay, setOndeley] = useState(props.ondelay);
    const [offdelay, setOffdelay] = useState(props.offdelay);
    // const [drawerState, setDrawerState] = useState(false);
   
    // If the state of the switch (in props) changes set the switchState
    // to that value.
    // useEffect(() => {
    //     setSwitchState( props.state )
    //     setDrawerState(!drawerState);
        
    // }, [ props.state ])  

    // The callback for when the user clicks on a switch.
    // const handleChange=(e)=>{
    //     setSwitchState(!switchState);
    //     var num = props.switchnum;
    //     props.sendSwitch(props.control_topic, num, switchState);
    // }

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