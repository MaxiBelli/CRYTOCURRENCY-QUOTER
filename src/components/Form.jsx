import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useSelectCurrencies from "../hooks/useSelectCurrencies";
import { currencies } from "../data/currencies";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = () => {
  const [cryptos, setCryptos] = useState([]);

  const [currency, SelectCurrencies] = useSelectCurrencies(
    "Choose your Currency",
    currencies
  );
  const [cryptoCurrency, SelectCryptoCurrency] = useSelectCurrencies(
    "Choose your Cryptocurrency",
    cryptos
  );
  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const cryptoArray = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return object;
      });

      setCryptos(cryptoArray);
    };
    consultAPI();
  }, []);

  return (
    <>
      <form>
        <SelectCurrencies />
        <SelectCryptoCurrency />
        <InputSubmit type="submit" value="Quote" />
      </form>
    </>
  );
};

export default Form;
