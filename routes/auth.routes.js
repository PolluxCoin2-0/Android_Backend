import express from "express";
import {register, updateToken} from "../controllers/auth.controllers.js";
const router = express.Router();

router.post("/register", register);
router.post("/updateToken", updateToken);

export default router;