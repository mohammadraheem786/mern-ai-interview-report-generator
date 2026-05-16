import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient({
    path: process.env.CHROMA_URL,
    auth: {
        provider: "token",
        credentials: process.env.CHROMA_AUTH_TOKEN,
    }
});

export default chromaClient;