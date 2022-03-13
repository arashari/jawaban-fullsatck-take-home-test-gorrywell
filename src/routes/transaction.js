import express from "express";

import Controller from "../controllers/transaction.js";

const router = express.Router();

router.post("/purchase", Controller.purchase);
router.post("/get_info", Controller.getInfo);

export default router;
