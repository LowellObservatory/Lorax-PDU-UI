import React from 'react';
import {
  Offcanvas,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function FocusOffcan(props) {

  const { showFocus, toggleShowFocus } = props

  return (
    <Offcanvas placement={'end'} show={showFocus} onHide={toggleShowFocus}
      style={{ background: "rgb(254, 254, 180)" }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Focus the Telescope</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Use the Buttons and inputs below to run a focus loop.
        <p />
        <Button variant="primary" onClick={toggleShowFocus}>
          Focus now
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default FocusOffcan;