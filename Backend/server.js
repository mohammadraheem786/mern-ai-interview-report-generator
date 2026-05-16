import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/db.js";

connectToDB();

app.listen(5000, () => {
    console.log("Server Running on: http://localhost:5000");
});