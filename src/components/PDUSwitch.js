import React, { useState, useEffect } from 'react';
import {
    Form
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUNavbar.css';

function PDUSwitch(props) {

    const [switchState, setSwitchState] = useState(props.state);

    // If the state of the switch (in props) changes set the switchState
    // to that value.
    useEffect(() => {
        setSwitchState( props.state )
    }, [ props.state ])

    // The callback for when the user clicks on a switch.
    const handleChange=(e)=>{
        setSwitchState(!switchState);
        var num = props.switchnum;
        props.sendSwitch(props.control_topic, num, switchState);
    }

    return (
        // The switch has a label that comes in from props and is
        // set to the value in 'switchState', true or false.
        <Form.Check
            type="switch"
            id="outlet-switch"
            label={props.switchLabel}
            defaultChecked={switchState}
            onChange={handleChange}
        />
    )
}

export default PDUSwitch;