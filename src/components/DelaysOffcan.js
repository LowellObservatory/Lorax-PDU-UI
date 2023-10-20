import React from 'react';
import {
  Offcanvas,
  Button,
  ButtonGroup,
  Form,
  ToggleButton
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DelaysOffcan(props) {

  const [radioValue, setRadioValue] = React.useState('1');
  const [radioValue2, setRadioValue2] = React.useState('1');

  const { showDelays, toggleShowDelays } = props

  return (
    <Offcanvas
      placement={'end'}
      show={showDelays}
      onHide={toggleShowDelays}
      style={{ background: "rgb(254, 254, 180)" }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Set Delays</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Change the delays for each outlet.
        <p />
        <Form.Label htmlFor="basic-url">delays</Form.Label>
        
        <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Outlet 1"
        />
        <p />
        <Button variant="primary" onClick={toggleShowDelays}>
          Set delays now
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  )
}


export default DelaysOffcan;