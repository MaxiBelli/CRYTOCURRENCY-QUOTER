import styled from "@emotion/styled";

const Container = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 10px;
`;
const Image = styled.img`
  display: block;
  width: 90px;
`;

const Text = styled.p`
  font-size: 15px;
  span {
    font-weight: 700;
  }
`;

const Price = styled.p`
  font-size: 21px;
  span {
    font-weight: 600;
  }
`;

const Result = ({ result }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    result;
  return (
    <Container style={{ scrollMarginTop: "20rem" }}>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="crypto image" />
      <div>
        <Price>
          The Price is: <span>{PRICE}</span>
        </Price>
        <Text>
          Highest Price of the Day: <span>{HIGHDAY}</span>
        </Text>
        <Text>
          Lowest Price of the Day: <span>{LOWDAY}</span>
        </Text>
        <Text>
          Last 24 Hours Change: <span>{CHANGEPCT24HOUR}</span>
        </Text>
        <Text>
          Last Update: <span>{LASTUPDATE}</span>
        </Text>
      </div>
    </Container>
  );
};

export default Result;
