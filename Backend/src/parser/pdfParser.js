import fs from "fs";
import pdfParse from "pdf-parse-fork";
import cleanResumeText from "../utils/cleanResumeText.js";

const parsePDF = async (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const parsedData = await pdfParse(fileBuffer);
    return cleanResumeText(parsedData.text);
};

export default parsePDF;