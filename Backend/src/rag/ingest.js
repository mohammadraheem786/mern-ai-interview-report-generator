import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction }
from "@chroma-core/default-embed";

import data
from "../data/interview_rag_dataset_v2.json"
with { type: "json" };

const client = new ChromaClient({
    host: "auth-proxy-production-e2f4.up.railway.app",
    port: 443,
    ssl: true,
    headers: {
        Authorization: `Bearer 4go7k2dxt5xz24if`
    }
});

const collections = {

    technical_questions:
        data.filter(
            (d) =>
                d.category ===
                "technical_question"
        ),

    behavioral_questions:
        data.filter(
            (d) =>
                d.category ===
                "behavioral_question"
        ),

    resume_review_rules:
        data.filter(
            (d) =>
                d.category ===
                "resume_review"
        ),

    company_patterns:
        data.filter(
            (d) =>
                d.category ===
                "company_interview_pattern"
        ),

    skill_gap_rules:
        data.filter(
            (d) =>
                d.category ===
                "skill_gap_rule"
        ),

    role_expectations:
        data.filter(
            (d) =>
                d.category ===
                "role_expectation"
        )

};

const buildMetadata = (item) => ({

    category:
        item.category || "",

    chunk_type:
        item.chunk_type || "",

    role:
        item.role || "",

    skill:
        item.skill ||
        item.missing_skill ||
        "",

    difficulty:
        item.difficulty || "",

    experience_level:
        item.experience_level || "",

    importance_score:
        item.importance_score || 0,

    company:
        item.company || "",

    level:
        item.level || "",

    related_skills:
        (item.related_skills || [])
        .join(", "),

    keywords:
        (item.keywords || [])
        .join(", ")

});

const ingestCollection = async (
    collectionName,
    items
) => {

    try {

        await client.deleteCollection({
            name: collectionName
        });

        console.log(
            `🗑️ Deleted old: ${collectionName}`
        );

    } catch (_) {}

    const collection =
    await client.createCollection({

        name: collectionName,

        embeddingFunction:
            new DefaultEmbeddingFunction()

    });

    const documents = items.map(
        (item) =>
            item.searchable_text
    );

    const ids = items.map(
        (item) => item.id
    );

    const metadatas = items.map(
        buildMetadata
    );

    await collection.add({

        ids,
        documents,
        metadatas

    });

    console.log(
        `✅ Ingested ${items.length} docs → ${collectionName}`
    );

};

const ingestAll = async () => {

    console.log(
        "\n🚀 Starting ingestion...\n"
    );

    for (
        const [name, items]
        of Object.entries(collections)
    ) {

        if (items.length > 0) {

            await ingestCollection(
                name,
                items
            );

        }

    }

    console.log(
        "\n🎉 All collections ready!\n"
    );

};

ingestAll().catch(console.error);