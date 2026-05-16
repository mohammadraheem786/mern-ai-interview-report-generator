const buildRetrievalQueries = ({
    missingSkills,
    matchedSkills,
    experienceLevel,
    targetRole
}) => {

    const queries = [];

    (missingSkills || []).forEach((skill) => {

        queries.push(
            `${skill} interview questions for ${experienceLevel}`
        );

        queries.push(
            `${skill} important concepts for ${targetRole}`
        );

        queries.push(
            `${skill} scenario based interview questions`
        );

        queries.push(
            `${skill} common mistakes and best practices`
        );

    });

    (matchedSkills || []).forEach((skill) => {

        queries.push(
            `${skill} advanced interview questions`
        );

    });

    return [...new Set(queries)];

};

export default buildRetrievalQueries;