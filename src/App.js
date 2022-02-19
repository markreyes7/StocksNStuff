import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import TickerGroup from './Components/TickerGroup';


import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>StocksNStuff</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col lg={2} xl={2}>
            <TickerGroup />
          </Col>
          <Col lg={10} xl={10}>Main</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
