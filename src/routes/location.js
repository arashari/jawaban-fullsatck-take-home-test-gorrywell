import express from "express";

import Controller from "../controllers/location.js";

const router = express.Router();

router.post("/create", Controller.create);
router.get("/get", Controller.get);

export default router;
