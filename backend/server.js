import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({
    path: './env'
})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Backend is running on PORT ", PORT);
})