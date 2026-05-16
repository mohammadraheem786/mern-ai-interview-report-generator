import chromaClient from "./chromaClient.js";

const COLLECTIONS = [
    "technical_questions",
    "behavioral_questions",
    "resume_review_rules",
    "company_patterns",
    "skill_gap_rules",
    "role_expectations"
];

const retrieveContext = async (retrievalQueries) => {

    const retrievedChunks = [];

    for (const collectionName of COLLECTIONS) {

        try {

            const collection = await chromaClient.getCollection({
                name: collectionName
                // ← no embeddingFunction
            });

            for (const query of retrievalQueries) {

                const results = await collection.query({
                    queryTexts: [query],
                    nResults: 2
                });

                if (results.documents && results.documents[0]) {
                    results.documents[0].forEach((doc) => {
                        retrievedChunks.push(doc);
                    });
                }

            }

        } catch (error) {
            console.log(`Skipping collection ${collectionName}:`, error.message);
        }

    }

    return [...new Set(retrievedChunks)];

};

export default retrieveContext;