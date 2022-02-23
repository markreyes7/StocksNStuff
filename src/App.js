import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import TickerGroup from './Components/TickerGroup';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const [symbolToRemove, setSymbolToRemove] = useState();

  const [labelsToDisplay, setLabels] = useState([]);
  const [dataToDisplay, setData] = useState([]);

  useEffect(() => {
    if(symbolToRemove === "undefined"){
      return
    }
    else{
    let labels =[];
    let information=[]
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolToRemove}&apikey=MWDL1LRHL23LC64V`).then(res => res.json())
      .then((data) => {
        console.log("from the main APP")
        var info = data["Time Series (Daily)"];
        Object.keys(info).slice(1,5).map((keys, index) => labels.push(keys));
        setLabels(labels)
        console.log("labels")
        console.log(labels)

        for(var i=0; i <labels.length;i++){
          information.push(data["Time Series (Daily)"][labels[i]["2. high"]])
        }
        setData(information)

      })
  }}, [symbolToRemove])

  // useEffect(() => {
  //   if(symbolToRemove === "undefined"){
  //     return
  //   }
  //   else{
  //   let information = []
  //   fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolToRemove}&apikey=MWDL1LRHL23LC64V`).then(res => res.json())
  //   .then((results) => {
  //     for(var i =0; i < labelsToDisplay.length;i++){
  //       console.log("inside loop")
  //       console.log(labelsToDisplay[i])
  //       information.push(results["Time Series (Daily)"][labelsToDisplay[i]]["2. high"])
  //       setData(information)
  //       console.log("info here")
  //       console.log(information)
  //     }
      
  //   })
  // }},[symbolToRemove, labelsToDisplay])
 
  

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
            <TickerGroup setSymbolToRemove={setSymbolToRemove} symbolToRemove={symbolToRemove} />
          </Col>
          <Col lg={10} xl={10}>
            {(symbolToRemove === "undefined") ? (<p style={{ color: "red" }}>LOADING</p>) : (<p style={{ color: "white" }}>{symbolToRemove}</p>)}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
