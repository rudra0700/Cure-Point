import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";
import config from "./config/index.js";
import router from "./app/routes/index.js";
import globalErrorHandlers from "./app/middlewares/globalErrorHandlers.js";


const app: Application = express();

//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Server is running...",
    enviroment: config.node_env,
    uptime: process.uptime().toFixed(2) + " sec",
    timeStamp: new Date().toISOString(),
  });
});

app.use(globalErrorHandlers);


export default app;
