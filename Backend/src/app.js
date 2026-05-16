import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();

app.use(cors({
    origin: [
        "https://mern-ai-interview-report-generator.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRoutes);

export default app;