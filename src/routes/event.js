import express from "express";

import Controller from "../controllers/event.js";

const router = express.Router();

router.post("/create", Controller.create);
router.post("/ticket/create", Controller.createTicket);
router.get("/get_info", Controller.getInfo);

export default router;
