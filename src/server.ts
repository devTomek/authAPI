import "dotenv/config";
import express, { Application, Request, Response } from "express";
import usersRouter from "./routes/users.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/users", usersRouter);

app.listen(Number(PORT), HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;
