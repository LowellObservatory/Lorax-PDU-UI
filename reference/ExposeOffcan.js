import React from 'react';
import {
  Offcanvas,
  Button,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExposeOffcan(props) {

  const { showExpose, toggleShowExpose } = props

  return (
    <Offcanvas placement={'end'} show={showExpose} onHide={toggleShowExpose}
      style={{ background: "rgb(254, 254, 180)" }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Take Exposures</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Use the Buttons and inputs below to take exposures.
        <p />
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Binning</InputGroup.Text>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Exposure Time</InputGroup.Text>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm"># of Exposures</InputGroup.Text>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
        <Button variant="primary" onClick={toggleShowExpose}>
          Expose now
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ExposeOffcan;