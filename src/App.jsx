import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";
import CryptoImage from "./img/image-cryptos.png";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 900px;
  width: 100%;
  margin: 50px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #ffffff;
  text-align: center;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 30px;

  &::after {
    content: "";
    width: 130px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 15px auto 0 auto;
  }
`;

const ResultWrapper = styled.div`
  margin-top: 18px;
  padding-top: 10px;
  border-top: 5px solid #66a2fe;
  scroll-margin-top: 100px; /* para evitar que el encabezado se solape con el resultado */
`;

function App() {
  const [coins, setCoins] = useState({});
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(coins).length > 0) {
      const quoteCrypto = async () => {
        setLoading(true);
        setResult({});

        const { currency, cryptoCurrency } = coins;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;

        const response = await fetch(url);
        const data = await response.json();

        setResult(data.DISPLAY[cryptoCurrency][currency]);

        setLoading(false);
        
      };

      quoteCrypto();
    }
  }, [coins]);

  return (
    <Container>
      <Image src={CryptoImage} alt="crypto images" />
      <div>
        <Heading>Instantly Quote Cryptocurrencies</Heading>
        <Form setCoins={setCoins} />
        {loading && <Spinner />}
        <ResultWrapper id="result">
          {result.PRICE && <Result result={result} />}
        </ResultWrapper>
      </div>
    </Container>
  );
}

export default App;
