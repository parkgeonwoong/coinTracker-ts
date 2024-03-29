/**
 * @desc: coin 상세 페이지
 * @route : /:coinId
 */

import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTicker } from "../models/api";
import { Helmet } from "react-helmet-async";

import { InfoData, LocationState, PriceData } from "../types/coinType";

function Coin() {
  const { coinId } = useParams(); // URL param에서 가져온 값
  const { state } = useLocation() as LocationState; // Link state에서 가져온 props

  // useMatch 확인
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const navigate = useNavigate();

  // TODO: React-Query 똑같은 이름 바꾸는 것
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
    ["ticker", coinId],
    () => fetchCoinTicker(coinId),
    {
      refetchInterval: 5000, // query 3번째에 실시간 fetch 5초마다
    }
  );

  const loading = infoLoading || tickerLoading;

  // fetch 원래 하던 방식
  // const [loading, setLoading] = useState(true);
  // // api 값 담는 곳
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     // 상세정보 api
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();

  //     // 가격 api
  //     const priceData = await await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  return (
    <Container>
      <Helmet>
        <title>
          {state?.coin?.name
            ? state.coin.name
            : loading
            ? "Loading.."
            : infoData?.name}
        </title>
      </Helmet>

      <Header>
        {/* 경로 예외처리 */}
        <Title>
          <Img alt="" src={state?.src ? state.src : infoData?.logo} />
          {state?.coin?.name
            ? state.coin.name
            : loading
            ? "Loading.."
            : infoData?.name}
        </Title>
      </Header>

      {/* 뒤로가기 */}
      <Back>
        <button onClick={() => navigate("/")}>👈 Back</button>
      </Back>

      {/* 로딩 */}
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          {/* 상세 설명 구간 */}
          <OverView>
            <OverViewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol</span>
              <span>{infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Price</span>
              <span>{tickerData?.quotes?.USD?.price.toFixed(2)}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverViewItem>
          </OverView>

          {/* Nesting Routing 탭 구간 */}
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          {/* 자식 Router */}
          <Outlet context={{ coinId: coinId }} />
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
  background-color: ${(props) => props.theme.boxColor};
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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.boxColor};
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 0px;
  border-radius: 15px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
`;

const Back = styled.div`
  display: flex;
  margin-bottom: 20px;

  button {
    background-color: ${(props) => props.theme.boxColor};
    color: ${(props) => props.theme.textColor};
    padding: 5px 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s linear;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export default Coin;
