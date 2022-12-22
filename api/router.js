import { Router } from "express";
import login from "./handlers/login.js";
import updateProfile from "./handlers/updateProfile.js";

export const router = Router();

router.post("/login", login);

router.post("/update", updateProfile);
