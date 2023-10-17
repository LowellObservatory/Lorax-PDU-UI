import React, { useState, useEffect } from 'react';
import PDUNavbar from "./PDUNavbar";
import PDUDisplay from './PDUDisplay';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import useBrokerMQTT from "./useBrokerMQTT";
import configData from "../config.json";
import './MainPage.css';


function MainPage() {

    // const [agents, setAgents] = useState([]);
    const [ta, setTA] = useState([]);
    
    const {
        client,
        message,
        topic,
        handleConnect,
        handlePublish,
        handleSubscribe,
        // handleUnsub,
        // handleDisconnect
    } = useBrokerMQTT();

    useEffect(() => {
        handleConnect(configData.Broker_URL);

        var agents = configData.PDUAgents;
        var keys = Object.keys(agents);
        var t = [];
        for (let i = 0; i < keys.length; i++) {
            t.push({nm: keys[i],
                    bt: agents[keys[i]]["Broadcast_Topic"],
                    ct: agents[keys[i]]["Control_Topic"]});
        }
        setTA(t)
    }, []);

    useEffect(() => {
        var agents = configData.PDUAgents;
        var keys = Object.keys(agents);
        for (let i = 0; i < keys.length; i++) {
            handleSubscribe(agents[keys[i]]["Broadcast_Topic"], 0);
            handleSubscribe(agents[keys[i]]["Control_Topic"], 0);
        }
    }, [client]);

    const sendSwitch = (control_topic, switchnum, switchstate) => {
        switchnum = switchnum + 1;     // "0" indexed to "1" indexed
        if (switchstate) {
            handlePublish(control_topic, 0, "outlet_off(" + switchnum + ")");
        } else {
            handlePublish(control_topic, 0, "outlet_on(" + switchnum + ")");
        }
    }

    return (
        <Container fluid style={{ width: "98%", height: "100%" }}>
            <PDUNavbar />

            {/* Add a little space at the top, below the Navbar, above the Grid. */}
            <Row style={{ marginLeft: 0, marginRight: 0 }} ><p /></Row>
            
            {/* This is the Bootstrap Grid layout. */}
            <Row  >
                {ta.map(function(data, i) {
                    return (
                        <PDUDisplay info = {data}
                        message = {message}
                        topic = {topic}
                        sendSwitch = {sendSwitch}
                        zorb = {i} key = {i} />
                    )
                })}
            </Row>
        </Container >
    )
}

export default MainPage;