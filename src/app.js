import express from "express";
import passport from "passport";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import sessionsRouter from "./routes/sessionsRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import "./config/passport.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(passport.initialize());

// Rutas
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/tickets", ticketRouter);

export default app;
