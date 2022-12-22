import express from "express";
import { router } from "./router.js";
import morgan from "morgan";
import cors from "cors";
// import { protect } from "./modules/auth";
// import { signin, createNewUser } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);

export default app;
