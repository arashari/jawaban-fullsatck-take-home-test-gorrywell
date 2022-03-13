import express from "express";

import BusinessError from "../models/BusinessError.js";

import event from "./event.js";
import location from "./location.js";
import transaction from "./transaction.js";

const router = express.Router();

router.use("/event", event);
router.use("/location", location);
router.use("/transaction", transaction);

router.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

router.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof BusinessError) {
    res.status(err.code).json({ code: err.code, message: err.message });
    return;
  }

  res
    .status(500)
    .json({ code: 500, message: err.message || "something wrong" });
});

export default router;
