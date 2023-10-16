import { useState } from 'react';
import mqtt from "precompiled-mqtt";

function useBrokerMQTT() {

    const [client, setClient] = useState(null);
    const [message, setMessage] = useState(null);
    const [topic, setTopic] = useState(null);

    function handleConnect(url) {
        const options = {
            keepalive: 30,
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: "WillMsg",
                payload: "Connection Closed abnormally..!",
                qos: 0,
                retain: false,
            },
            clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
            username: "username",
            password: "password",
            rejectUnauthorized: false
        };

        console.log(" in handleConnect");

        // console.log(url)

        doConnect(url, options);
    }

    function doConnect(host, mqttOptions) {
        console.log("in doConnect");
        // console.log(host);
        // console.log(mqttOptions);

        var c = mqtt.connect(host, mqttOptions);
        var parser = new DOMParser();


        if (c) {
            // console.log("setting up onmessage");
            c.on("connect", () => {
                console.log("Connected");
                // console.log(c);
            });
            c.on("error", (err) => {
                console.error("Connection error: ", err);
                c.end();
            });
            c.on("message", (topic, message) => {
                // const payload = { topic, message: message.toString() };
                const changed = message.toString();
                // console.log("got a message");
                // console.log(topic)

                var doc = parser.parseFromString(changed, 'text/xml');
                // console.log((new XMLSerializer()).serializeToString(doc));
                setTopic(topic)
                setMessage(doc);
            });
        }
        setClient(c);
    };

    function handleSubscribe(topic, qos) {
        console.log("subscribing to: ");
        console.log(topic);
        if (client) {
            client.subscribe(topic, 0, (error) => {
                if (error) {
                    console.log("Subscribe to topics error", error);
                    return;
                }
            });
        }

    }

    function handleUnsub(topic, qos) {
        if (client) {
            client.unsubscribe(topic, (error) => {
                if (error) {
                    console.log("Unsubscribe error", error);
                    return;
                }
            });
        }
    };

    function handlePublish(topic, qos, payload) {
        // console.log(client);
        if (client) {
            client.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    console.log("Publish error: ", error);
                }
            });
        }
    };

    function handleDisconnect() {
        if (client) {
            client.end(() => {

            });
        }
    };

    return {
        client,
        message,
        topic,
        handleConnect,
        handlePublish,
        handleSubscribe,
        handleUnsub,
        handleDisconnect
    };
}

export default useBrokerMQTT;