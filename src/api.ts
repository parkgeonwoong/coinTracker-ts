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
