/**
 * @desc: react-query를 위한 api 담는 파일
 */

// Coin.tsx fetch 사용
export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
