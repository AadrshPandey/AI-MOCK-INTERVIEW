import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.GEMINI_API_KEY){
    console.log("Gemini Api key is not set add it to backend/.env");
}

const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});

export async function askGemini(prompt) {
    const result = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents : prompt
    });

    return result.text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();
}