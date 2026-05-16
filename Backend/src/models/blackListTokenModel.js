import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required for blacklisting"],
        },
    },
    {
        timestamps: true,
    }
);

const blackListTokenModel = mongoose.model("blackListToken", blackListTokenSchema);

export default blackListTokenModel;