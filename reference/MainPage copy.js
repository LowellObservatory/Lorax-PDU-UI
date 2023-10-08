import React from 'react';
import PDUNavbar from "./PDUNavbar";
import PDUSwitch from './PDUSwitch';
import {
  Container,
  Row,
  Button,
  ButtonGroup,
  Col
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


function MainPage() {
  const [showFocus, setShowFocus] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const [showExpose, setShowExpose] = React.useState(false);
  const [showLOIS, setShowLOIS] = React.useState(false);

  const toggleShowFocus = () => setShowFocus(p => !p);
  const toggleShowFilter = () => setShowFilter(p => !p);
  const toggleShowExpose = () => setShowExpose(p => !p);
  const toggleShowLOIS = () => setShowLOIS(p => !p);

  return (


    <Container fluid style={{ width: "98%", height: "100%" }}>
      <PDUNavbar />

      {/* Add a little space at the top, below the Navbar, above the Grid. */}
      <Row style={{ marginLeft: 0, marginRight: 0 }} ><p /></Row>

      {/* This is the Bootstrap Grid layout. */}
      <Row style={{ marginLeft: 0, marginRight: 0 }} >
        
        <Col xs="auto" style={{ minWidth: 150, paddingLeft: 10, paddingRight: 0 }}>
          <div style={{ width: "100%", height: "100%" }}>
            <ButtonGroup vertical style={{ width: "100%" }}>
              <Button variant="outline-dark" onClick={toggleShowFilter}>Filters</Button>
              <Button variant="outline-dark" onClick={toggleShowExpose}>Expose</Button>
              <Button variant="outline-dark" onClick={toggleShowFocus}>Focus</Button>
              <Button variant="outline-dark" onClick={toggleShowLOIS}>LOIS cmds</Button>
            </ButtonGroup>

            <FilterOffcan showFilter={showFilter} toggleShowFilter={toggleShowFilter} />
            <ExposeOffcan showExpose={showExpose} toggleShowExpose={toggleShowExpose} />
            <FocusOffcan showFocus={showFocus} toggleShowFocus={toggleShowFocus} />
            <LOISModal showLOIS={showLOIS} toggleShowLOIS={toggleShowLOIS} />

          </div>
          <PDUSwitch />
        </Col>
      </Row>

    </Container >
    
  )
}

export default MainPage;