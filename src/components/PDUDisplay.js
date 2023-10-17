import React, { useState, useEffect, useReducer } from 'react';

import PDUSwitch from './PDUSwitch';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PDUDisplay.css';

function PDUDisplay(props) {

    const [broadcast, setBroadcast] = useState('');
    const [control, setControl] = useState('');
    const [pduname, setPduname] = useState('');
    const [numoutlets, setNumoutlets] = useState(5);
    const [outlets, setOutlets] = useState([]);

    useEffect(() => {
        setBroadcast(props.info.bt);
        setControl(props.info.ct);
        var pduname = props.info.nm + "name";
        setPduname(pduname);
        var init_outlets = [];
        setOutlets(init_outlets);
    },[]);

    useEffect(() => {
            if (props.topic === broadcast) {
                // console.log("got a message, updateing");
                var pdu_name = props.message.getElementsByTagName("pdu_name");
                pdu_name = pdu_name[0].childNodes[0].nodeValue;
                setPduname(pdu_name);
                document.getElementById(pduname).getElementsByClassName("pdu_name")[0].innerHTML = pdu_name;

                var num_outlets = props.message.getElementsByTagName("number_of_outlets");
                num_outlets = num_outlets[0].childNodes[0].nodeValue;
                setNumoutlets(num_outlets);

                // Update the outlets array.
                var outlet_names = props.message.getElementsByTagName("id_all_outlets");
                outlet_names = outlet_names[0].childNodes[0].nodeValue;
                var outlet_stat = props.message.getElementsByTagName("status_all_outlets");
                outlet_stat = outlet_stat[0].childNodes[0].nodeValue;
            
                var new_names = outlet_names.split(",");
                var new_stats = outlet_stat.split(",");
                var outlets = [];
                for (var i = 0; i < new_names.length; i++) {
                    new_names[i] = new_names[i].replaceAll(/[\[\]\']/g, "");
                    if (new_stats[i].includes("on")) {
                        new_stats[i] = true;
                    } else {
                        new_stats[i] = false;
                    }
                }
                for (var i = 0; i < new_names.length; i++) {
                    outlets.push([new_names[i], new_stats[i]]);
                }
                setOutlets(outlets);
            }
    }, [props.message]);
    
    return (
        <div id={pduname} className="pdudisp-div">
        <h1 className="pdu_name" id="pdu_name">{props.info.nm}</h1>
        <Col xs="auto" style={{ minWidth: 150, paddingLeft: 10, paddingRight: 0 }}>
            {outlets.map(function(data, i) {
                // console.log(outlets)
                return (
                    <PDUSwitch 
                    switchLabel = {data[0]}
                    state = {data[1]}
                    control_topic = {control}
                    sendSwitch = {props.sendSwitch}
                    switchnum = {i}
                    key = {i} />
                )
            })}
        </Col>
        </div>
    )
}

export default PDUDisplay;