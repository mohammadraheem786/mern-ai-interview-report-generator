import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import blackListTokenModel from "../models/blackListTokenModel.js";

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" }); // ✅ added expiry
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,        // ← required for HTTPS
    sameSite: "none",    // ← required for cross-domain cookies
});

        res.status(201).json({
            message: "User registered successfully",
            newUser: { id: newUser._id, username, email },
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await userModel.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ _id: userExists._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" }); // ✅ added expiry
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,        // ← required for HTTPS
    sameSite: "none",    // ← required for cross-domain cookies
});

        res.status(200).json({
            message: "User logged in successfully",
            user: { id: userExists._id, username: userExists.username, email },
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
}

async function logoutUser(req, res) {
    try {
        const token = req.cookies.token;  // ✅ was req.cookies.token.token (double .token bug)

        if (token) {
            const blacklistedToken = new blackListTokenModel({ token });
            await blacklistedToken.save();
        }

        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out user", error: error.message });
    }
}

async function getUserProfile(req, res) {
    try {
        const user = await userModel.findOne({ email: req.user.email }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User profile fetched successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
}

export { registerUser, loginUser, logoutUser, getUserProfile };