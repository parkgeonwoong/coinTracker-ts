/**
 * @desc : Coins 페이지
 * @route : /
 */

import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

// 가져올 api 인터페이스
export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  // const setDarkAtom = useSetRecoilState(isDarkAtom);
  // const toggleBtn = () => setDarkAtom((prev) => !prev);

  const isDark = useRecoilValue(isDarkAtom);

  // fetch 하던 방식
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>🅲oin</title>
      </Helmet>
      <Header>
        <Title>🅲oin</Title>
        {/* <button onClick={toggleBtn}>Toggle Test</button> */}
      </Header>
      {/* 로딩 */}
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id} isDark={isDark}>
              <Link
                to={`/${coin.id}`}
                state={{
                  coin: coin,
                  src: `https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`,
                }}
              >
                <Img
                  alt=""
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} 👉
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
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
  background-color: ${(props) => props.theme.bgColor};
`;

const CoinList = styled.ul``;

interface IisDark {
  isDark: boolean;
}

const Coin = styled.li<IisDark>`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: ${(props) =>
      props.isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.16)"}
    0px 1px 4px;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loading = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

export default Coins;
