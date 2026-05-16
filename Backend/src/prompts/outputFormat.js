const outputFormat = `

Return ONLY valid JSON.

Do not return markdown.
Do not return explanations outside JSON.
Do not wrap JSON in backticks.

Use this exact JSON structure:

{
  "strengths": [
    "string"
  ],

  "weaknesses": [
    "string"
  ],

  "skillGapAnalysis": [
    "string"
  ],

  "interviewReadiness": {
    "level": "string",
    "summary": "string"
  },

  "learningRoadmap": [
    {
      "phase": "string",
      "duration": "string",
      "topics": [
        "string"
      ]
    }
  ],

  "technicalQuestions": [
    {
      "question": "string",
      "difficulty": "string"
    }
  ],

  "behavioralQuestions": [
    {
      "question": "string"
    }
  ],

  "finalReadinessScore": {
    "score": 0,
    "reason": "string"
  }
}

`;

export default outputFormat;