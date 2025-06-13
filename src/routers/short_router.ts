import {safeShort} from "../controller/shortener_controllers.js"
import express from "express";

const router = express.Router();

router.post("/short", safeShort)

export default router;
