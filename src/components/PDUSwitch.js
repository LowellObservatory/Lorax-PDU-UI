import React, { useState, useEffect } from 'react';
import {
    Form
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUNavbar.css';

function PDUSwitch(props) {

    const [switchState, setSwitchState] = useState(props.state);
    const [drawerState, setDrawerState] = useState(false);
   
    // If the state of the switch (in props) changes set the switchState
    // to that value.
    useEffect(() => {
        setSwitchState( props.state )
        setDrawerState(!drawerState);
        
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
            style={props.pending ? { opacity:0.5, color: "red" } : { color: "black" }}
            type="switch"
            id="outlet-switch"
            label={props.switchLabel}
            defaultChecked={switchState}
            key = {drawerState}
            onChange={handleChange}
        />
    )
}

export default PDUSwitch;