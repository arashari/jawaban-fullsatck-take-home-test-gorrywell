import express from "express";

import Controller from "../controllers/location.js";

const router = express.Router();

router.get("/create", Controller.create);
router.get("/get", Controller.get);

export default router;
