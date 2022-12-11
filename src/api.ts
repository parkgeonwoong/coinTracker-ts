/**
 * @desc: react-query를 위한 api 담는 파일
 */

const BASE_URL = "https://api.coinpaprika.com/v1";

// Coin.tsx fetch 사용
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

// Coins.tsx
export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTicker(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

// Chart.tsx
export function fetchCoinHistory(coinId: string | undefined) {
  // 만약 날짜-> 시간이 필요한 param이라면?
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 23 * 1;

  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => response.json());
  //   return fetch(
  //     `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  //   ).then((response) => response.json());
}
