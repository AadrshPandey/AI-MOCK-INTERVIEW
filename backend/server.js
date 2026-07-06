import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import interviewRouter from "./routes/interview.routes.js"

dotenv.config({
    path: './env'
})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", interviewRouter);

app.listen(PORT, () => {
    console.log("Backend is running on PORT ", PORT);
})