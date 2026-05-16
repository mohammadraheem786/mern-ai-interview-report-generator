import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";







const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,  // your Vite frontend URL
  credentials: true,                // if using cookies/auth headers
}));

app.use(express.json());
app.use(cookieParser());

import authRouter from "./routes/auth-routes.js";  // ✅ full path
import interviewRoutes
from "./routes/interviewRoutes.js"; // ✅ full path
app.use(
    "/api/interview",
    interviewRoutes
);                        // ✅ valid router
app.use('/api/auth', authRouter);




export default app