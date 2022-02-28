import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import TickerGroup from './Components/TickerGroup';
import { useState, useEffect } from 'react';
import Login from './Components/Login';
import Chart from './Components/Chart';
import useToken from './Components/useToken';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



function App() {

  const { token, setToken } = useToken();

  const [symbolToRemove, setSymbolToRemove] = useState();
  const [labelsToDisplay, setLabels] = useState([]);
  const [dataToDisplay, setData] = useState([]);
  
  useEffect(() => {
    if (symbolToRemove === "undefined") {
      return
    }
    else {
      let labels = [];
      let information = []
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbolToRemove}&apikey=APIKEY`).then(res => res.json())
        .then((data) => {
          console.log("from the main APP")
          var info = data["Time Series (Daily)"];
          Object.keys(info).slice(0, 5).map((keys, index) => labels.push(keys));
          setLabels(labels)
          console.log("labels")
          console.log(labels)

          for (var i = 0; i < labels.length; i++) {
            console.log("from the inside loop")
            console.log(labels[i])
            console.log(data["Time Series (Daily)"][labels[i]]["2. high"])
            information.push(data["Time Series (Daily)"][labels[i]]["2. high"])
          }
          console.log("the info here is ")
          console.log(information)
          setData(information)

        })

    }

  }, [symbolToRemove])

  let obj = {
    labels: labelsToDisplay,
    datasets: [
      {
        label: "Prices in USD",
        data: dataToDisplay,
        borderColor: 'rgb(180, 11, 246)',
        backgroundColor: [
          '#2adfff'
        ],
        pointHitRadius: 4,
        pointHoverRadius: 5
      }
    ]
  }
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (

    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>StocksNStuff</Navbar.Brand>
        </Container>
        <Link to="/preferences">Preferences</Link>
      </Navbar>
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
    </div>
  );
}

export default App;