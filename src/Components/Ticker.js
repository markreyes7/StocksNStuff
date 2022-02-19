
import CloseButton from 'react-bootstrap/CloseButton';
import Container from 'react-bootstrap/Container'

const Ticker = ({ tickerName, high, low, volume }) => {
  return (
    <li style={{listType: "None"}}>
      <Container>
        <h3>{tickerName} <span><CloseButton /></span></h3>
  
      </Container>

      <Container>
        <p>high: {high}</p>
        <p>low: {low}</p>

      </Container>
     
    </li>
  )
}

export default Ticker