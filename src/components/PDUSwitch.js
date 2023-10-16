import React, { useState } from 'react';
import {
    Form
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUNavbar.css';

function PDUSwitch(props) {

    const [switchState, setSwitchState] = useState(props.state);

    // console.log(props.state)

    const handleChange=(e)=>{
        // console.log(switchState);
        setSwitchState(!switchState);
        // console.log(switchState);
        var num = props.switchnum;
        // console.log(typeof num);
        props.sendSwitch(props.control_topic, num, switchState);
        // console.log(switchState);
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