import React, { useState, useEffect, useReducer } from 'react';

import PDUSwitch from './PDUSwitch';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUDisplay.css';

function PDUDisplay(props) {

    const [broadcast, setBroadcast] = useState('');
    const [control, setControl] = useState('');
    const [pduname, setPduname] = useState('');
    const [numoutlets, setNumoutlets] = useState(5);
    const [outlets, setOutlets] = useState([]);

    // Do this once, set some things up when started.
    useEffect(() => {
        setBroadcast(props.info.bt);
        setControl(props.info.ct);
        var pduname = props.info.nm + "name";
        setPduname(pduname);
        var init_outlets = [];
        setOutlets(init_outlets);
    },[]);

    // This is called when a new message comes in on the agent broadcast topic.
    // We check to see if the message is for this PDU, and, if so, reconfigure
    // both the outlet names and the outlet status's based on the broadcast status.
    useEffect(() => {
            if (props.topic === broadcast) {
                // console.log(broadcast);
                // get the pdu name from the message and update.
                var pdu_name = props.message.getElementsByTagName("pdu_name");
                pdu_name = pdu_name[0].childNodes[0].nodeValue;
                setPduname(pdu_name);
                document.getElementById(pduname).getElementsByClassName("pdu_name")[0].innerHTML = pdu_name;

                // Get the number of outlets from the message and update.
                var num_outlets = props.message.getElementsByTagName("number_of_outlets");
                num_outlets = num_outlets[0].childNodes[0].nodeValue;
                setNumoutlets(num_outlets);

                // Update the outlets array.
                var outlet_names = props.message.getElementsByTagName("id_all_outlets");
                outlet_names = outlet_names[0].childNodes[0].nodeValue;
                var outlet_stat = props.message.getElementsByTagName("status_all_outlets");
                outlet_stat = outlet_stat[0].childNodes[0].nodeValue;
                var outlet_ondelay = props.message.getElementsByTagName("delayon_all_outlets");
                outlet_ondelay = outlet_ondelay[0].childNodes[0].nodeValue;
                var outlet_offdelay = props.message.getElementsByTagName("delayoff_all_outlets");
                outlet_offdelay = outlet_offdelay[0].childNodes[0].nodeValue;
                var outlet_commandpending = props.message.getElementsByTagName("commandpending_all_outlets");
                outlet_commandpending = outlet_commandpending[0].childNodes[0].nodeValue;
                // console.log(outlet_ondelay);
                // console.log(outlet_offdelay);
            
                // Update the outlet names.
                var new_names = outlet_names.split(",");
                var new_stats = outlet_stat.split(",");
                var new_on = outlet_ondelay.replaceAll(/[\[\]\']/g, "");
                var new_off = outlet_offdelay.replaceAll(/[\[\]\']/g, "");
                new_on = new_on.split(",");
                new_off = new_off.split(",");
                var new_pending = outlet_commandpending.split(",");
                var outlets = [];
                for (var i = 0; i < new_names.length; i++) {
                    new_names[i] = new_names[i].replaceAll(/[\[\]\']/g, "");
       
                    if (new_stats[i].includes("on")) {
                        new_stats[i] = true;
                    } else {
                        new_stats[i] = false;
                    }

                    if (new_pending[i].includes("True")) {
                        new_pending[i] = true;
                    } else {
                        new_pending[i] = false;
                    }
                }
                for (var i = 0; i < new_names.length; i++) {
                    outlets.push([new_names[i], new_stats[i],
                        new_on[i], new_off[i], new_pending[i]]);
                }
                // console.log(outlets);
                setOutlets(outlets);
            }
    }, [props]);
    
    return (
        // Return a div with the pdu name at the top and a set of labeled switches.
        <div id={pduname} className="pdudisp-div" >
        <h1 className="pdu_name" id="pdu_name">{props.info.nm}</h1>
        <Col xs="auto" style={{ minWidth: 150, paddingLeft: 10, paddingRight: 0 }}>
             {/* Call a function to draw all the switches for this PDU.
                 Pass in the switch label and switch state from 'data'.
                 We pass in the control topic so the switch can send it
                 back to the MainPage when a switch is thrown.
                 We also pass in the 'sendSwitch' function we got in props. */}
            {outlets.map(function(data, i) {
                // console.log(outlets)
                var label = data[0];
                var state = data[1];
                var pending = data[4];
                return (
                    <PDUSwitch 
                    switchLabel = {label}
                    state = {state}
                    pending = {pending}
                    control_topic = {control}
                    sendSwitch = {props.sendSwitch}
                    switchnum = {i}
                    key = {i} />
                )
            })}
            <Row style={{ marginLeft: 0, marginRight: 0 }} ><p /></Row>
            <Row style={{ marginLeft: 10, marginRight: 20 }} >
                <Button variant="outline-dark" size="sm" onClick={() => props.toggleShowDelays(outlets)} >
                    View Delays
                </Button>
            </Row>
        </Col>
        </div>
    )
}

export default PDUDisplay;