import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient({
    host: "auth-proxy-production-e2f4.up.railway.app",
    port: 443,
    ssl: true,
    headers: {
        Authorization: `Bearer ${process.env.CHROMA_AUTH_TOKEN}`
    }
});

export default chromaClient;