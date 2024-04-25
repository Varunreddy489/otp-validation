import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser";

import otpRoutes from "./routes/otpRoutes.js";
import authRoutes from './routes/auth.routes.js'

import connectToMongo from "./db/connnectToMongo.js";

const app = express();

dotenv.config();

app.use(cors({origin: "*",}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => {
  connectToMongo();
  console.log(`server running on ${PORT} `);
});
