import Ticker from "./Ticker"
import Pagination from "react-bootstrap/Pagination"
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from "react"

const TickerGroup = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    var weekend = "2022-02-18";  /*use for weekend testing */

    const [userInput, setUserInput] = useState();
    const [symbols, setTickerSymbols] = useState([]);
    const [currTickers, setTickers] = useState([]);

    useEffect(() => {
        console.log(currTickers)

    }, [currTickers])

    return (

        <div>

            <ol>
                {(currTickers.length === 0) ? (<p>Add Stocks To Track</p>) :
                    (<div>
                        {currTickers.map((key, i) => <Ticker key={i} tickerName={symbols[i]} low={key["3. low"]} high={key["2. high"]}></Ticker>)}
                    </div>)
                }
            </ol>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Ticker Symbol</Form.Label>
                    <Form.Control type="text" placeholder="Enter Symbol" onChange={(e) => {
                        setUserInput(e.target.value);
                    }} />
                    <Form.Text className="text-muted">
                        Type in the form of ticker symbol (e.g AAPL, IBM. GOOG )
                    </Form.Text>
                </Form.Group>
            </Form>
            <Pagination>
                <Pagination.Item>-</Pagination.Item>
                <Pagination.Item onClick={async () => {
                    if (userInput === "") {
                        console.log("bad boy")
                        return
                    }
                    await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${userInput}&apikey=MWDL1LRHL23LC64V`)
                        .then(res => res.json())
                        .then((data) => {
                            console.log(data)
                            setTickerSymbols(prevSymbols => [...prevSymbols, userInput.toUpperCase()])
                            setTickers(prevTickers => [...prevTickers, data["Time Series (Daily)"][weekend]])
                        })

                }}>+</Pagination.Item>
            </Pagination>
        </div>
    )
}

export default TickerGroup