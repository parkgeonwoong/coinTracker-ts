/**
 * @desc: Router 시작
 * index -> Router -> App -> Children
 */

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import NotFound from "./routes/NotFound";
import Price from "./routes/Price";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: <Coins />,
        },
        {
          path: ":coinId",
          element: <Coin />,
          children: [
            {
              path: "price",
              element: <Price />,
            },
            {
              path: "chart",
              element: <Chart />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
