import Container from 'react-bootstrap/Container';
import Overlay from 'react-bootstrap/Overlay';
import { useState, useRef, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import { PopoverHeader } from 'react-bootstrap';

const Ticker = ({ tickerName, high, low, volume, setSymbolToRemove, symbolToRemove }) => {
  const [glowing, setGlowing] = useState(false);
  const [netIncome, setNetIncome] = useState(0);
  const [profitloss, setProfitLoss] = useState(0);
  const [dividendPay, setDividendPay] = useState(0);

  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <li className={(glowing === true) ? 'glowing' : 't-style'} onClick={(e) => {
      console.log(e.target.textContent)
      setSymbolToRemove(e.target.textContent)
    }}>
      <Container>
        <OverlayTrigger trigger="click" placement="top" overlay={
          <Popover>
            <PopoverHeader as='h4'>AnnualReport</PopoverHeader>
            <Popover.Body>
              <div>
                Net Income: ${netIncome}
              </div>
              <div>
                ProfitLoss: ${profitloss}
              </div>
              <div>
                DividendPayOut: ${dividendPay}
              </div>
            </Popover.Body>
          </Popover>
        }>
          <h3 className='t-symbol' onClick={(e) => {
            setGlowing(!glowing)
            fetch(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${e.target.textContent}&apikey=MWDL1LRHL23LC64V`).then(res => res.json())
              .then((data) => {
                console.log("from the other calll")
                setNetIncome(data["annualReports"][0]["netIncome"]);
                setProfitLoss(data["annualReports"][0]["profitLoss"]);
                setDividendPay(data["annualReports"][0]["dividendPayout"]);
              })
          }
          } >{tickerName}</h3>
        </OverlayTrigger>
      </Container>

      <Container>
        <p style={{ color: "white" }}>high: ${high}</p>
        <p style={{ color: "white" }}>low: ${low}</p>

        <Overlay ></Overlay>
      </Container>

    </li>
  )
}

export default Ticker