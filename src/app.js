import express from "express";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import sessionsRouter from "./routes/sessionsRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionsRouter);

export default app;
