import chromaClient
from "./chromaClient.js";

import { DefaultEmbeddingFunction }
from "@chroma-core/default-embed";

const COLLECTIONS = [

    "technical_questions",

    "behavioral_questions",

    "resume_review_rules",

    "company_patterns",

    "skill_gap_rules",

    "role_expectations"

];

const retrieveContext = async (
    retrievalQueries
) => {

    const retrievedChunks = [];

    for (const collectionName of COLLECTIONS) {

        const collection =
            await chromaClient.getCollection({

                name: collectionName,

                embeddingFunction:
                    new DefaultEmbeddingFunction()

            });

        for (const query of retrievalQueries) {

            const results =
                await collection.query({

                    queryTexts: [query],

                    nResults: 2

                });

            if (
                results.documents &&
                results.documents[0]
            ) {

                results.documents[0].forEach(
                    (doc) => {

                        retrievedChunks.push(doc);

                    }
                );

            }

        }

    }

    return [...new Set(retrievedChunks)];

};

export default retrieveContext;