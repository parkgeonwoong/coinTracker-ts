import { Link, useParams } from "react-router-dom";

function Coin() {
  const { coinId } = useParams();

  return (
    <div>
      <Link to={"/"}>Coins</Link>
      <h3>Coin: {coinId}</h3>
    </div>
  );
}

export default Coin;
