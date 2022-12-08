/**
 * @desc: coin 상세 페이지
 * @route : /:coinId
 */

import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { CoinInterface } from "./Coins";

interface LocationState {
  state: {
    coin: CoinInterface;
    src: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams(); // URL param에서 가져온 값
  const { state } = useLocation() as LocationState; // Link state에서 가져온 props

  // api 값 담는 곳
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  // console.log(state.coin);

  useEffect(() => {
    (async () => {
      // 상세정보 api
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      // 가격 api
      const priceData = await await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        {/* 경로 예외처리 */}
        <Title>
          <Img src={state?.src ? state.src : info?.logo} />
          {state?.coin?.name
            ? state.coin.name
            : loading
            ? "Loading.."
            : info?.name}
        </Title>
      </Header>

      {/* 로딩 */}
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>Rank</span>
              <span>{info?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol</span>
              <span>{info?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>open source</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverViewItem>
          </OverView>
          <Description>{info?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Outlet />
        </>
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
`;

const Loading = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 45px;
  width: 45px;
  margin-right: 10px;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #718093;
  border-radius: 15px;
  padding: 10px 20px;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

export default Coin;
