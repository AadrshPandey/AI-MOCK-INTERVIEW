import { askGemini } from "../gemini.js";

const generateQuestions = async (req, res) => {
  try {
    const { role, difficulty, count } = req.body;

    if (!role || !difficulty || !count) {
      return res
        .status(400)
        .json({ error: "role, difficulty, and count are required." });
    }

    const prompt = `
You are an experienced technical interviewer. Generate exactly ${count} interview questions
for a candidate applying for a "${role}" role, at "${difficulty}" difficulty.

Rules:
- Mix conceptual and practical/scenario-based questions where appropriate for the role.
- Do not include answers.
- Do not number the questions in the text itself.
- Respond with ONLY valid JSON, no markdown, no commentary, in exactly this shape:

{
  "questions": [
    { "id": 1, "question": "..." },
    { "id": 2, "question": "..." }
  ]
}
`.trim();

    const raw = await askGemini(prompt);
    const parsed = JSON.parse(raw);

    res.json(parsed);    

  } catch (err) {
    console.log("[generateQuestions] error:", err.message);
    res.status(500).json({
      error: "Failed to generate questions. Please try again.",
    });
  }
};


export { generateQuestions };