import React, { useState, useEffect } from 'react';

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
        // console.log(props.info);
        setBroadcast(props.info.bt);
        setControl(props.info.ct);
        var pduname = props.info.nm + "name";
        setPduname(pduname);
        var init_outlets = [["oname1", true], ["oname2", true], ["oname3", false], ["oname4",false] ];
        init_outlets = [];
        setOutlets(init_outlets)
    },[]);

    useEffect(() => {
            // console.log("the topic");
            // console.log(props.info.nm);
            // console.log(props.topic);
            if (props.topic === broadcast) {
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
                // console.log(outlet_names);
                // console.log(outlet_stat);
                var new_names = outlet_names.split(",");
                var new_stats = outlet_stat.split(",");
                var outlets = [];
                // console.log(new_names);
                for (var i = 0; i < new_names.length; i++) {
                    // console.log(new_stats[i]);
                    new_names[i] = new_names[i].replaceAll(/[\[\]\']/g, "")
                    if (new_stats[i].includes("on")) {
                        new_stats[i] = true;
                    } else {
                        new_stats[i] = false;
                    }
                }
                // console.log(new_names);
                for (var i = 0; i < new_names.length; i++) {
                    // console.log(new_stats[i])
                    outlets.push([new_names[i], new_stats[i]]);
                }
                // console.log(pduname);
                // console.log(outlets);
                setOutlets(outlets);
            }
    }, [props.message]);

    

    //     document.getElementById("connection").innerHTML = "State: Connected";
    
    return (
        <div id={pduname} className="pdudisp-div">
        <h1 className="pdu_name" id="pdu_name">{props.info.nm}</h1>
        <Col xs="auto" style={{ minWidth: 150, paddingLeft: 10, paddingRight: 0 }}>
            {outlets.map(function(data, i) {
                // console.log(data[1])
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
            {/* <PDUSwitch switchLabel="mount" state={true} />
            <PDUSwitch switchLabel="filter wheel" state={false} />
            <PDUSwitch switchLabel="camera" state={false} />
            <PDUSwitch switchLabel="focuser" state={false} />
            <PDUSwitch switchLabel="dome" state={true} /> */}
        </Col>
        </div>
    )
}

export default PDUDisplay;