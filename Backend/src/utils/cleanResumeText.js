const cleanResumeText = (text) => {

    return text
        .replace(/\s+/g, " ")
        .replace(/\n+/g, " ")
        .trim();

};

export default cleanResumeText;