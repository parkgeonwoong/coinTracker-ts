/**
 * @desc : Price 페이지
 * @route : /:coinId/price
 */

import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTicker } from "../api";
import { PriceData } from "./Coin";

interface PriceProps {
  coinId: string;
}

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTicker(coinId)
  );

  const USD = data?.quotes?.USD;
  const x = USD?.ath_date as string;
  const maxDate = new Date(x).toDateString();

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
              <span>$ {USD?.ath_price.toFixed(2)}</span>
            </BoxItem>
          </Box>

          {/* 1, 6시간 전 */}
          <Box>
            <BoxItem>
              <span>1시간 전보다</span>
              <span>{USD?.percent_change_1h} %</span>
            </BoxItem>
            <BoxItem>
              <span>6시간 전보다</span>
              <span>{USD?.percent_change_6h} %</span>
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
  background-color: #718093;
  border-radius: 15px;
  padding: 10px 20px;

  span {
    margin: 5px 0px;
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
          color: #f6b93b;
        }
      }
    }
  }
`;

export default Price;
