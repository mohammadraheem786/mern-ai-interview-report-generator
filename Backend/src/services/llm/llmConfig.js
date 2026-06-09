const llmConfig = {

    // ─────────────────────────────
    // Active Provider
    // ─────────────────────────────

    provider: "gemini",

    // ─────────────────────────────
    // DeepSeek Config
    // ─────────────────────────────

     groq: {

        model:
            "llama-3.1-8b-instant",

        temperature: 0.4,

        top_p: 1,

        max_tokens: 2500

    },

    deepseek: {

        model:
            "deepseek-ai/deepseek-v4-flash",

        temperature: 0.5,

        top_p: 0.95,

        max_tokens: 2500,

        reasoning_effort:
            "medium"

    },

    // ─────────────────────────────
    // Gemini Config
    // ─────────────────────────────

    gemini: {
    model: "gemini-1.5-flash"
},

    // ─────────────────────────────
    // Mistral Config
    // ─────────────────────────────

    mistral: {

        model:
            "mistralai/mistral-medium-3.5-128b",

        temperature: 0.7,

        top_p: 1,

        max_tokens: 2500,

        stream: false

    }

};

export default llmConfig;