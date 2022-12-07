/**
 * @desc: coin 상세 페이지
 * @route : /:coinId
 */

import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { CoinInterface } from "./Coins";

interface LocationState {
  state: {
    coin: CoinInterface;
    src: string;
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const location = useLocation();
  const { state } = useLocation() as LocationState; // Link state에서 가져온 props

  console.log(location.state.src);
  console.log(state.coin);

  return (
    <Container>
      <Header>
        {/* 경로 예외처리 */}
        <Title>
          <Img src={state.src} />
          {state.coin?.name || "Wrong Path.."}
        </Title>
      </Header>

      {/* 로딩 */}
      {loading ? <Loading>Loading...</Loading> : null}
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 10px 0px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 500;
`;

const Loading = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 45px;
  width: 45px;
  margin-right: 10px;
`;

export default Coin;
