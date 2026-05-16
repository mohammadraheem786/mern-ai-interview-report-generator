const cleanJsonResponse = (
    text
) => {

    return text

        .replace(/```json/g, "")

        .replace(/```/g, "")

        .replace(/\n/g, " ")

        .trim();

};

export default cleanJsonResponse;