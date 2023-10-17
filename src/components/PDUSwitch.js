import React, { useState, useEffect } from 'react';
import {
    Form
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUNavbar.css';

function PDUSwitch(props) {

    const [switchState, setSwitchState] = useState(props.state);

    useEffect(() => {
        setSwitchState( props.state )
   }, [props.state ])

    const handleChange=(e)=>{
        setSwitchState(!switchState);
        var num = props.switchnum;
        props.sendSwitch(props.control_topic, num, switchState);
    }

    return (
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