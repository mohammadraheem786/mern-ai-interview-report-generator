const formatSkill = (skill) => {

    const specialCases = {
        "typescript": "TypeScript",
        "javascript": "JavaScript",
        "node.js": "Node.js",
        "express.js": "Express.js",
        "ci/cd": "CI/CD",
        "aws": "AWS",
        "gcp": "GCP",
        "api": "API",
        "rest api": "REST API",
        "html": "HTML",
        "css": "CSS",
        "sql": "SQL",
        "mongodb": "MongoDB",
        "mysql": "MySQL",
        "postgresql": "PostgreSQL",
        "graphql": "GraphQL",
        "nlp": "NLP",
        "sdlc": "SDLC",
        "c++": "C++",
        "c#": "C#",
    };

    const lower = skill.toLowerCase();

    return (
        specialCases[lower] ||
        skill.charAt(0).toUpperCase() + skill.slice(1)
    );

};

export default formatSkill;