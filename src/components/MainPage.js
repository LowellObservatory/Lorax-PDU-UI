import React, { useState, useEffect } from 'react';
import PDUNavbar from "./PDUNavbar";
import PDUDisplay from './PDUDisplay';
import DelaysOffcan from './DelaysOffcan';
import SetDelayModal from './SetDelayModal';
import {
    Container,
    Row
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import useBrokerMQTT from "./useBrokerMQTT";
import configData from "../config.json";


function MainPage() {

    // const [agents, setAgents] = useState([]);
    const [ta, setTA] = useState([]);
    const [showDelays, setShowDelays] = useState(false);
    const [showSetDelay, setShowSetDelay] = useState(false);
    const [outlets, setOutlets] = useState(null);
    const [setdelaypduname, setSetdelaypduname] = useState(null);
    const [setdelaycontroltopic, setSetdelaycontroltopic] = useState(null);
    
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

    const toggleShowDelays = (outlets) => {
        setShowDelays(p => !p);
        setOutlets(outlets);
    }

    const toggleShowSetDelay = (pduname, control) => {
        setShowSetDelay(p => !p);
        setSetdelaypduname(pduname)
        setSetdelaycontroltopic(control)
    }

    // Connect to the message broker, then assemble the config data into
    // a useful format to use below.  (this only happens once)
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

    // When the client is ready, that is, connected, subscribe to all
    // the topics in the config file. (this should only happen once)
    useEffect(() => {
        var agents = configData.PDUAgents;
        var keys = Object.keys(agents);
        for (let i = 0; i < keys.length; i++) {
            handleSubscribe(agents[keys[i]]["Broadcast_Topic"], 0);
            handleSubscribe(agents[keys[i]]["Control_Topic"], 0);
        }
    }, [client]);

    // When a switch is switched on the interface, call the appropriate
    // agent routine.
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
                {/* Call a function to draw a PDU display for each PDU in the config file.
                    Pass in the 'data' which contains the broadcast and control
                    broker topics. We pass in the current topic and message so
                    the pdudisplay can react to new messages. We also pass in the 'sendSwitch'
                    function to be called when a switch is switched.  Also pass in toggleShowDelays
                    and toggleShowSetDelay which trigger an offscreen component and a modal component.
                     */}
                {ta.map(function(data, i) {
                    return (
                        <PDUDisplay info = {data}
                        message = {message}
                        topic = {topic}
                        toggleShowDelays={toggleShowDelays}
                        toggleShowSetDelay={toggleShowSetDelay}
                        sendSwitch = {sendSwitch}
                        key = {i} />
                    )
                })}
                <DelaysOffcan outlets = {outlets} showDelays={showDelays} toggleShowDelays={toggleShowDelays} />
                <SetDelayModal showSetDelay={showSetDelay}
                    setdelaypduname = {setdelaypduname}
                    setdelaycontroltopic = {setdelaycontroltopic}
                    toggleShowSetDelay={toggleShowSetDelay}
                    handlePublish = {handlePublish} />
            </Row>
        </Container >
        
    )
}

export default MainPage;