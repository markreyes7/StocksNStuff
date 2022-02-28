import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import TickerGroup from './TickerGroup';
import {Line} from 'react-chartjs-2';



const Home = ({setSymbolToRemove, symbolToRemove, obj}) => {
    return (
        <Container fluid>
            <Row>
                <Col lg={2} xl={2}>
                    <TickerGroup setSymbolToRemove={setSymbolToRemove} symbolToRemove={symbolToRemove} />
                </Col>
                <Col lg={10} xl={10}>
                    {(typeof symbolToRemove !== "undefined") ? (<Line data={obj}></Line>) : (<p>HI</p>)}
                </Col>
            </Row>
        </Container>
    )
}

export default Home