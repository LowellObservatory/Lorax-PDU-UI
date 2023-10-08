import React from 'react';
import {
  Modal,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LOISModal.css';

function LOISModal(props) {

  const { showLOIS, toggleShowLOIS } = props

  return (
    <Modal
      show={showLOIS}
      onHide={toggleShowLOIS}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>LOIS Commands</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Use the Buttons below to control LOIS.
        <p />
        <ButtonGroup vertical>
          <Button variant="outline-primary">Initialize LOIS</Button>
          <Button variant="outline-primary">Exit LOIS</Button>
          <Button variant="outline-primary">Test Broker</Button>
          <Button variant="outline-primary">Enable Exposure</Button>
          <Button variant="outline-primary">Disable Exposure</Button>
          <Button variant="outline-primary">Stop Series/Script</Button>
        </ButtonGroup>
        <p />
        <Button variant="primary" onClick={toggleShowLOIS}>
          Close
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default LOISModal;