import mongoose
from "mongoose";

const interviewReportSchema =
    new mongoose.Schema(

        {

            user: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "User",

                required: true

            },

            targetRole: {

                type: String,

                required: true

            },

            experienceLevel: {

                type: String,

                required: true

            },

            resumeText: {

                type: String

            },

            jobDescription: {

                type: String

            },

            resumeSkills: [

                String

            ],

            jobSkills: [

                String

            ],

            matchedSkills: [

                String

            ],

            missingSkills: [

                String

            ],

            ragContext: [

                String

            ],

            aiReport: {

                type: Object,

                required: true

            }

        },

        {

            timestamps: true

        }

    );

const InterviewReport =
    mongoose.model(

        "InterviewReport",

        interviewReportSchema

    );

export default InterviewReport;