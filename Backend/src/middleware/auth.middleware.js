import jwt from "jsonwebtoken";
import blackListTokenModel from "../models/blackListTokenModel.js";

/**
 * Middleware to authenticate user using JWT token from cookies
 * Checks if the token is valid and not blacklisted
 * If valid, attaches the decoded user information to the request object and calls next()
 * If invalid or missing, returns a 401 Unauthorized response
 */
async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const blacklistedToken = await blackListTokenModel.findOne({ token });
    if (blacklistedToken) {
        return res.status(401).json({ message: "Unauthorized, Token is Invalid" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded User:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export { authUser };