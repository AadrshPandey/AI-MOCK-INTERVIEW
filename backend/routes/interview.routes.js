import express from "express"
import { Router } from "express"
import { generateQuestions } from "../controllers/generateQuestions.controllers.js";
import { evaluateAnswers } from "../controllers/evaluateAnswers.controllers.js";

const interviewRouter = Router();

interviewRouter.route("/generateQuestions").post(generateQuestions);

interviewRouter.route("/evaluateAnswers").post(evaluateAnswers);

export default interviewRouter;