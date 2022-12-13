/**
 * @desc : Chart 그리는 페이지
 * @route : /:coinId/chart
 */

import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

// interface
interface ChartProps {
  coinId: string;
  isDark: boolean;
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
  const { coinId, isDark } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        // 차트 컴포넌트
        <ApexChart
          // 데이터 값
          series={[
            {
              name: "Coin Chart",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          // 선 그래프
          type="line"
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: { width: 500, height: 500, background: "transparent" },
            yaxis: { show: false },
            xaxis: {
              type: "datetime",
              categories:
                data?.map((price) =>
                  new Date(price.time_close).toISOString()
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
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#78e08f"],
                stops: [0, 100],
              },
            },
            colors: ["#079992"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(1)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
