import fs from "fs";

import parsePDF
from "../parser/pdfParser.js";

import extractSkills
from "../utils/extractSkills.js";

import findSkillGap
from "../utils/findSkillGap.js";

import buildRetrievalQueries
from "../rag/buildRetrievalQueries.js";

import retrieveContext
from "../rag/retrieveContext.js";

import buildPrompt
from "../prompts/buildPrompt.js";

import generateLLMResponse
from "../services/llm/llmService.js";

import InterviewReport
from "../models/interviewReport.model.js";

// ─────────────────────────────────
// Upload Resume + Generate Report
// ─────────────────────────────────

const uploadResume =
async (req, res) => {

    try {

        // Validate File

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "No resume uploaded"

            });

        }

        // Inputs

        const {

            jobDescription,
            targetRole,
            experienceLevel

        } = req.body;

        // Parse Resume

        const extractedText =
            await parsePDF(
                req.file.path
            );

        // Extract Skills

        const ResumeExtractedSkills =
            extractSkills(
                extractedText
            );

        const JobExtractedSkills =
            extractSkills(
                jobDescription
            );

        // Skill Gap Analysis

        const {

            matchedSkills,
            missingSkills

        } = findSkillGap(

            ResumeExtractedSkills,
            JobExtractedSkills

        );

        // Build RAG Queries

        const queries =
            buildRetrievalQueries({

                targetRole,
                experienceLevel,

                missingSkills,
                matchedSkills

            });

        // Retrieve Context

        const ragContext =
            await retrieveContext(
                queries
            );

        // Build Prompt

        const prompt =
            buildPrompt({

                targetRole,
                experienceLevel,

                matchedSkills,
                missingSkills,

                ragContext

            });

        // Generate AI Report

        const aiReport =
            await generateLLMResponse(
                prompt
            );

        // Save Report

        const savedReport =
            await InterviewReport.create({

                user:
                    req.user._id,

                targetRole,

                experienceLevel,

                resumeText:
                    extractedText,

                jobDescription,

                resumeSkills:
                    ResumeExtractedSkills,

                jobSkills:
                    JobExtractedSkills,

                matchedSkills,

                missingSkills,

                ragContext,

                aiReport

            });

        // Cleanup Uploaded File

        if (
            fs.existsSync(
                req.file.path
            )
        ) {

            fs.unlinkSync(
                req.file.path
            );

        }

        // Final Response

        return res.status(200).json({

            success: true,

            data: {

                targetRole,

                experienceLevel,

                ResumeExtractedSkills,

                JobExtractedSkills,

                matchedSkills,

                missingSkills,

                ragContext,

                aiReport,

                reportId:
                    savedReport._id

            }

        });

    } catch (error) {

        console.log(

            "Interview Controller Error:",

            error.message

        );

        // Cleanup

        if (

            req.file &&

            fs.existsSync(
                req.file.path
            )

        ) {

            fs.unlinkSync(
                req.file.path
            );

        }

        return res.status(500).json({

            success: false,

            message:
                "Failed to analyze interview"

        });

    }

};

// ─────────────────────────────────
// Get User Reports
// ─────────────────────────────────

const getMyReports =
async (req, res) => {

    try {

        const reports =
            await InterviewReport

                .find({

                    user:
                        req.user._id

                })

                .sort({

                    createdAt: -1

                });

        return res.status(200).json({

            success: true,

            reports

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch reports"

        });

    }

};
const getReportById = async (req, res) => {
    try {
        const report = await InterviewReport.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        return res.status(200).json({
            success: true,
            report
        });

    } catch (error) {
        console.log("Get Report By ID Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch report"
        });
    }
};

const deleteReport = async (req, res) => {
    try {
        const report = await InterviewReport.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Report deleted successfully"
        });

    } catch (error) {
        console.log("Delete Report Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete report"
        });
    }
};

export {
    uploadResume,
    getMyReports,
    getReportById,
    deleteReport
};
// ─────────────────────────────────
// Exports
// ─────────────────────────────────
