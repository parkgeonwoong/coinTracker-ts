/**
 * @desc : Chart 그리는 페이지
 * @route : /:coinId/chart
 */

import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          series={[
            {
              name: "Coin Chart",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          type="line"
          options={{
            theme: { mode: "dark" },
            chart: { width: 500, height: 500, background: "transparent" },
            yaxis: { show: false },
            xaxis: {
              categories:
                data?.map((price) =>
                  new Date(price.time_close).toLocaleDateString("en-US")
                ) ?? [],
              labels: { show: false },
              axisTicks: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            stroke: { curve: "smooth" },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
