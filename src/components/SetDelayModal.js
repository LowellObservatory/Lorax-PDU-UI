import React, {useState} from 'react';
import {
  Modal,
  ButtonGroup,
  Button,
  Form,
  Col,
  Row
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SetDelayModal.css';

function SetDelayModal(props) {

    const { showSetDelay, setdelaypduname, toggleShowSetDelay, setdelaycontroltopic, handlePublish } = props
    const [outletNum, setOutletNum] = useState(0);
    const [onDelay, setOnDelay] = useState(0);
    const [offDelay, setOffDelay] = useState(0);

    const sendDelay = () => {
        handlePublish(setdelaycontroltopic, 0, "set_outlet_on_delay(" + outletNum + ", " + onDelay + ")");
        handlePublish(setdelaycontroltopic, 0, "set_outlet_off_delay(" + outletNum + ", " + offDelay + ")");
    }
    
  return (
    <Modal
      show={showSetDelay}
      onHide={toggleShowSetDelay}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Set Delay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {setdelaypduname}
        <p />
        Use the fields below to set a on-delay or off-delay for outlet.
        <p />
        <Form.Group as={Row} className="mb-3" controlId="formOutlet">
            <Form.Label column sm="2">
                Outlet#
            </Form.Label>
            <Col sm="10">
                <Form.Control type="text"
                onChange={(e) => setOutletNum(e.currentTarget.value)}
                defaultValue={outletNum}/>
            </Col>
            
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formOnDelay">
            <Form.Label column sm="2">
                OnDelay
            </Form.Label>
            <Col sm="10">
                <Form.Control type="text"
                onChange={(e) => setOnDelay(e.currentTarget.value)}
                defaultValue={onDelay} />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formOffDelay">
            <Form.Label column sm="2">
                OffDelay
            </Form.Label>
            <Col sm="10">
                <Form.Control type="text"
                onChange={(e) => setOffDelay(e.currentTarget.value)}
                defaultValue={offDelay} />
            </Col>
        </Form.Group>
        <Button variant="primary" onClick={sendDelay}>
          Send Delay
        </Button>
        
      </Modal.Body>
    </Modal>
  )
}

export default SetDelayModal;