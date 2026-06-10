import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { requestInfo } from "./middlewares/requestInfo.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(requestInfo);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "It's  working!",
  });
});

app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.listen(Number(PORT), HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;
