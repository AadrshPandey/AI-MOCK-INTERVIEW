import { askGemini } from "../gemini";

const evaluateAnswers = async (req, res) => {
  try {
    const { role, items } = req.body;

    if (!role || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "role and a non-empty items array are required." });
    }

    const prompt = `
You are an experienced technical interviewer evaluating a candidate for a "${role}" role.
Below is a list of question/answer pairs from a mock interview. An empty or missing answer
should score very low and the feedback should say the question was left unanswered.

For each pair, provide:
- score: integer 0-10
- feedback: 1-2 sentence honest assessment of the answer
- improvement: 1 concise, actionable suggestion to improve the answer

Also provide:
- overallScore: integer 0-10, the average/holistic score across all answers
- summary: 2-3 sentence overall assessment of the candidate's performance

Respond with ONLY valid JSON, no markdown, no commentary, in exactly this shape:

{
  "overallScore": 7,
  "summary": "...",
  "results": [
    {
      "question": "...",
      "answer": "...",
      "score": 7,
      "feedback": "...",
      "improvement": "..."
    }
  ]
}

Here are the question/answer pairs:
${JSON.stringify(items, null, 2)}
`.trim();

    const raw = await askGemini(prompt);
    const parsed = JSON.parse(raw);

    res.json(parsed);
  } catch (err) {
    console.error("[evaluateAnswers] error:", err.message);
    res.status(500).json({
      error: "Failed to evaluate answers. Please try again.",
    });
  }
};


export { evaluateAnswers };