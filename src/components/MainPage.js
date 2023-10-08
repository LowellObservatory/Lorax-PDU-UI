import React, { useState, useEffect } from 'react';
import PDUNavbar from "./PDUNavbar";
import PDUSwitch from './PDUSwitch';
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

    // const [Connected, setConnected] = useState(false);
    const {
        client,
        message,
        handleConnect,
        handlePublish,
        handleSubscribe,
        // handleUnsub,
        // handleDisconnect
    } = useBrokerMQTT();

    useEffect(() => { // First set up the "topics" dictionary.
        var agents = configData.PDUAgents;
        // console.log(agents)
        var keys = Object.keys(agents);
        // console.log(keys)
        var t_dict = {};
        for (let i = 0; i < keys.length; i++) {
            t_dict[keys[i]] = agents[keys[i]]["Broadcast_Topic"];
            // console.log(t_dict[keys[i]])
        }

        handleConnect(configData.Broker_URL);

        for (let i = 0; i < keys.length; i++) {
            // console.log("t_dict");
            handleSubscribe(t_dict[keys[i]], 0)
        }
    }, []);

    return (
        <Container fluid style={{ width: "98%", height: "100%" }}>
            <PDUNavbar />

            {/* Add a little space at the top, below the Navbar, above the Grid. */}
            <Row style={{ marginLeft: 0, marginRight: 0 }} ><p /></Row>
            
            {/* This is the Bootstrap Grid layout. */}
            <Row  >
                <PDUDisplay />
                <PDUDisplay />
                
            </Row>
        </Container >

    )
}

export default MainPage;