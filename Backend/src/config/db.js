import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connected To Database");
    } catch (error) {
        console.log(error);  // ✅ was "err" (undefined variable bug)
    }
}

export default connectToDB;