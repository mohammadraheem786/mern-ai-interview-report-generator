const llmConfig = {
    provider: "gemini",

    groq: {
        model: "llama-3.1-8b-instant",
        temperature: 0.4,
        top_p: 1,
        max_tokens: 2500
    },

    deepseek: {
        model: "deepseek-ai/deepseek-v4-flash",
        temperature: 0.5,
        top_p: 0.95,
        max_tokens: 2500,
        reasoning_effort: "medium"
    },

    gemini: {
        model: "gemini-2.0-flash"
    },

    mistral: {
        model: "mistralai/mistral-medium-3.5-128b",
        temperature: 0.7,
        top_p: 1,
        max_tokens: 2500,
        stream: false
    }
};

export default llmConfig;