import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { connect } from "./config/db.config";
import { userRouter } from "./routes/user";

dotenv.config();
connect();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(4000, () => {
	console.log("Server running");
});