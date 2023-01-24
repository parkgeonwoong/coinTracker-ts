/**
 * @desc : Price 페이지
 * @route : /:coinId/price
 */

import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTicker } from "../models/api";
import { PriceData } from "../types/coinType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

// 타입 지정
interface PriceProps {
  coinId: string;
}

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTicker(coinId),
    {
      refetchInterval: 5000,
    }
  );

  let USD = data?.quotes?.USD;

  let maxDate = new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(
    new Date(USD?.ath_date ?? 0)
  );

  let ath_price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(USD?.ath_price ?? 0);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {/* 최고가 */}
          <Box>
            <BoxItem>
              <span>최고가 달성일 </span>
              <span>{maxDate}</span>
              <span>{ath_price}</span>
            </BoxItem>
          </Box>

          {/* 1, 6시간 전 */}
          <Box>
            <BoxItem>
              <span>1시간 전보다</span>
              <BoxItemContext>
                <span>{USD?.percent_change_1h} %</span>
                <span>
                  <FontAwesomeIcon
                    icon={
                      Math.sign(USD?.percent_change_1h ?? 0) >= 1
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                </span>
              </BoxItemContext>
            </BoxItem>
            <BoxItem>
              <span>6시간 전보다</span>
              <BoxItemContext>
                <span>{USD?.percent_change_6h} %</span>
                <span>
                  <FontAwesomeIcon
                    icon={
                      Math.sign(USD?.percent_change_6h ?? 0) >= 1
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                </span>
              </BoxItemContext>
            </BoxItem>
          </Box>

          {/* 24시간, 30일 전 */}
          <Box>
            <BoxItem>
              <span>24시간 전보다</span>
              <BoxItemContext>
                <span>{USD?.percent_change_24h} %</span>
                <span>
                  <FontAwesomeIcon
                    icon={
                      Math.sign(USD?.percent_change_24h ?? 0) >= 1
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                </span>
              </BoxItemContext>
            </BoxItem>
            <BoxItem>
              <span>30일 전보다</span>
              <BoxItemContext>
                <span>{USD?.percent_change_30d} %</span>
                <span>
                  <FontAwesomeIcon
                    icon={
                      Math.sign(USD?.percent_change_30d ?? 0) >= 1
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                </span>
              </BoxItemContext>
            </BoxItem>
          </Box>
        </>
      )}
    </div>
  );
}

const BoxItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 15px;
  padding: 10px 20px;

  span {
    margin: 5px 0px;
    font-size: 12px;
    opacity: 0.7;
  }
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0px;

  &:first-child {
    display: flex;

    ${BoxItem} {
      width: 480px;

      span {
        &:nth-child(3) {
          font-size: 20px;
          font-weight: 700;
          color: #f6b93b;
        }
      }
    }
  }
`;

const BoxItemContext = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 20px;
    margin: 5px 10px;
  }
`;

export default Price;
