import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { connect } from "./config/db.config";

dotenv.config();
connect();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
	console.log("Server running");
});