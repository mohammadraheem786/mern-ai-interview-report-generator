import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient({
    host: process.env.CHROMA_URL,
    port: 443,
    ssl: true,
    headers: {
        Authorization: `Bearer ${process.env.CHROMA_AUTH_TOKEN}`
    }
});

export default chromaClient;