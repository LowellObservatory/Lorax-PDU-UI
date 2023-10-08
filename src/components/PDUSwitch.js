import React, { useState } from 'react';
import {
    Form
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUNavbar.css';

function PDUSwitch(props) {

    const [switchState, setSwitchState] = useState(props.state);

    // defaultChecked={switchState}

    const handleChange=(e)=>{
        setSwitchState(!switchState)
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