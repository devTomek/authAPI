import "dotenv/config";
import express, { Application, Request, Response } from "express";
import usersRouter from "./routes/users.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

export default app;
