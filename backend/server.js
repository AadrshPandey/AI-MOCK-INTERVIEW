import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import interviewRouter from "./routes/interview.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:5173"];


app.use(cors({
    origin : function(origin, callback){
        if(!origin) {
            return callback(null, true);
        }
        if(allowedOrigins.includes(origin)){
            callback(null, true);
        }
        else{
            callback(null, false);
        }
    },
    credentials: true
}));
app.use(express.json());

app.use("/api", interviewRouter);

app.listen(PORT, () => {
    console.log("Backend is running on PORT ", PORT);
})