import Container from 'react-bootstrap/Container';
import { useState, useRef, useEffect } from 'react';

const Ticker = ({ tickerName, high, low, volume, setSymbolToRemove, symbolToRemove }) => {
  const [glowing, setGlowing] = useState(false)


  return (
    <li className={(glowing === true) ? 'glowing' : 't-style'} onClick={(e) => {
      console.log(e.target.textContent)
      setSymbolToRemove(e.target.textContent)
    }}>
      <Container>
        <h3 className='t-symbol' onClick={() => {
          setGlowing(!glowing)
        }
        } >{tickerName}</h3>
      </Container>

      <Container>
        <p style={{ color: "white" }}>high: ${high}</p>
        <p style={{ color: "white" }}>low: ${low}</p>
      </Container>

    </li>
  )
}

export default Ticker